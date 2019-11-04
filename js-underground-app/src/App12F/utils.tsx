import * as R from 'ramda';
import uuid from 'uuid';
import { PuzzleItem, CombinedList } from './interface';
import { SnapThresholdInPx, PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';
import * as Utils2 from './utils2';


function updateDataById<T>(id: number, newObj: T, currentData: T[]): Array<T> {
  return R.map(
    R.when(R.propEq('id', id), () => newObj),
    currentData);
}


function getCanMergedCoordinateList(coordinate: [number, number]) {
  const x = coordinate[0];
  const y = coordinate[1];
  // 上，右，下，左
  return [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y]
  ]
}

// 如果有很靠近的item可以拼起來就回傳id
function checkCloserPuzzle(id: number, puzzleList: PuzzleItem[]): number[] {
  let res: number[] = [];
  // 每塊拼圖最多可以有四個鄰居。檢查四個鄰居有沒有接近的項目，有就放到list裡面
  const dragedItem = puzzleList.find(x => x.id === id);
  // 把鄰居的資料(座標)調出來
  let neighborInfoList = dragedItem && puzzleList.filter(item => {
    let target = false;
    getCanMergedCoordinateList(dragedItem.coordinate).forEach(neighbor => {
      if (R.equals(neighbor, item.coordinate)) {
        target = true;
      }
    })
    return target;
  });


  dragedItem && neighborInfoList &&
    neighborInfoList.forEach(candidate => {
      if (candidate) {
        const dragedItemLeft = dragedItem.left;
        const dragedItemRight = dragedItem.left + PuzzleWidthInPx;
        const dragedItemTop = dragedItem.top;
        const dragedItemBottom = dragedItem.top + PuzzleHeightInPx;
        const candidateLeft = candidate.left;
        const candidateRight = candidate.left + PuzzleWidthInPx;
        const candidateTop = candidate.top;
        const candidateBottom = candidate.top + PuzzleHeightInPx;

        // 兩者的左邊很靠近
        let leftInBounds: boolean = dragedItemLeft > (candidateLeft - SnapThresholdInPx) && dragedItemLeft < (dragedItemRight + SnapThresholdInPx);
        // 兩者的右邊很靠近
        let rightInBounds: boolean = dragedItemRight < (candidateRight + SnapThresholdInPx) && dragedItemRight > (candidateLeft - SnapThresholdInPx);
        // 兩者的上面很靠近
        let bottomInBounds: boolean = dragedItemBottom < (candidateBottom + SnapThresholdInPx) && dragedItemBottom > (candidateTop - SnapThresholdInPx);
        // 兩者的下面很靠近
        let topInBounds: boolean = dragedItemTop > (candidateTop - SnapThresholdInPx) && dragedItemTop < (candidateBottom + SnapThresholdInPx);

        // 右邊的拼圖可以結合
        const RightOneCanSnap = !leftInBounds && rightInBounds && bottomInBounds && topInBounds;

        // 左邊的拼圖可以結合
        const LeftOneCanSnap = leftInBounds && !rightInBounds && bottomInBounds && topInBounds;

        // 上面的拼圖可以結合
        const TopOneCanSnap = leftInBounds && rightInBounds && !bottomInBounds && topInBounds;

        // 下面的拼圖可以結合
        const BottomOneCanSnap = leftInBounds && rightInBounds && bottomInBounds && !topInBounds;

        // 上: 0, 右: 1, 下: 2, 左: 3
        let targetIndex = R.findIndex(x => R.equals(x, candidate.coordinate))(getCanMergedCoordinateList(dragedItem.coordinate))

        if (TopOneCanSnap && targetIndex === 0) {
          res.push(candidate.id);
        }
        if (RightOneCanSnap && targetIndex === 1) {
          res.push(candidate.id);
        }
        if (BottomOneCanSnap && targetIndex === 2) {
          res.push(candidate.id);
        }
        if (LeftOneCanSnap && targetIndex === 3) {
          res.push(candidate.id);
        }
      };
    })
  return res;
}



/*
draggedItem: 正在拖移的拼圖
canSnapItem: 可以拼起來的拼圖
*/
// TODO 沒有考慮方向性，上下或左右??
function calcPuzzlesPosition(draggedItem: PuzzleItem, canSnapItem: PuzzleItem) {
  let draggedItemCoordinate = draggedItem.coordinate;
  let canSnapItemCoordinate = canSnapItem.coordinate;

  return {
    ...draggedItem,
    left: canSnapItem.left - (canSnapItemCoordinate[0] - draggedItemCoordinate[0]) * PuzzleWidthInPx,
    top: canSnapItem.top - (canSnapItemCoordinate[1] - draggedItemCoordinate[1]) * PuzzleHeightInPx,
  }
}


/**
 * handle 拼起來的動作
 * closerItems: 可以組隊的拼圖
 * puzzleList: 所有拼圖資訊
 * dragedItem: 目前被移動的拼圖
 * 回傳更新座標的puzzleList
 */
function handleSnapPuzzle(closerItems: PuzzleItem[], puzzleList: PuzzleItem[], dragedItem: PuzzleItem): PuzzleItem[] {
  // 兩個拼圖相拼
  if (closerItems.length === 1) {
    console.log('>>>>>>>>>>')
    let calcRes = calcPuzzlesPosition(dragedItem, closerItems[0]);
    const updatedData = updateDataById(dragedItem.id, calcRes, puzzleList);
    return updatedData;
  }

  // 兩個以上的拼圖相拼，以最左邊的item為基準點，去調整其他的拼圖位置
  if (closerItems.length > 1) {
    console.log('>>>>>>>>>><<<<<<<<<<<<')
    // 找出左上角的拼圖id
    let leftTopPuzzleId = Math.min(...[dragedItem.id, ...closerItems.map(i => i.id)]);
    let leftTopPuzzle = puzzleList.find(i => i.id === leftTopPuzzleId)!;
    let neighborPuzzles = puzzleList.filter(i => [dragedItem.id, ...closerItems.map(i => i.id)].includes(i.id));
    const updatedData = reArrangePuzzlePosition(leftTopPuzzleId, neighborPuzzles, leftTopPuzzle.left, leftTopPuzzle.top);
    if (updatedData) {
      console.log('>>>>>>>>>>########<<<<<<<<<<<<', updatedData);
      // return updatedData;
      return puzzleList.map(x => {
        if (updatedData.map(i => i.id).includes(x.id)) {
          return updatedData.find(j => j.id === x.id)!;
        }
        return x;
      })
    }
  }

  return puzzleList;
}



function handleCombinedList(currentCombinedList: CombinedList[], puzzleList: PuzzleItem[], combinedIdList: number[]) {
  // Step1.如果有一樣的id，就結成同一組
  const hasIntersection = currentCombinedList.find(item => R.intersection(item.pieces, combinedIdList).length > 0);
  let tmpCombinedList = [];
  if (hasIntersection) {
    tmpCombinedList = currentCombinedList.map(item => {
      if (item.id === hasIntersection.id) {
        return {
          ...item,
          pieces: R.union(hasIntersection.pieces, combinedIdList).sort()
        }
      } else {
        return item;
      }
    })
  } else {
    // 否則，就增加一組
    tmpCombinedList = [
      ...currentCombinedList,
      {
        id: uuid.v4(),
        pieces: combinedIdList.sort()
      }
    ]
  }


  // Step2. 如果是上下左右的關係，就結成同一組
  let finalCombinedList = Utils2.findNeighborInCombinedList(tmpCombinedList, puzzleList);
  console.log('LLLL', finalCombinedList);
  // Step3. 重算座標
  let finalPuzzleList = finalCombinedList.reduce(
    (prev: PuzzleItem[], curr: CombinedList) => {
      // 找出左上角的拼圖id
      let leftTopPuzzleId = Math.min(...curr.pieces);
      let leftTopPuzzle = prev.find(i => i.id === leftTopPuzzleId)!;
      let neighborPuzzles = prev.filter(i => curr.pieces.includes(i.id));
      const updatedData = reArrangePuzzlePosition(leftTopPuzzleId, neighborPuzzles, leftTopPuzzle.left, leftTopPuzzle.top);
      console.log('updatedData', updatedData);
      if (updatedData) {
        // TODO 這邊可以更簡單嗎
        return prev.map(x => {
          if (updatedData.map(i => i.id).includes(x.id)) {
            return updatedData.find(j => j.id === x.id)!;
          }
          return x;
        })
      }
      return prev;
    }, puzzleList);
  return {
    combineList: finalCombinedList,
    puzzleList: finalPuzzleList
  }
}


// 隨機產生某範圍內的數字
function randomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function findLeftTopBaseItem(combinedPointList: number[][]) {
  // 找到最左上角的項目
  const baseLeftItem = combinedPointList.reduce((prev: number[] | null, curr: number[]) => {
    if (prev === null) {
      return curr;
    }
    const [prevX, prevY] = prev;
    const [currX, currY] = curr;
    // TODO 這裡應該有更好的判斷
    // 如果x,y都小，那就是最小
    if (prevX < currX && prevY < currY) {
      return prev;
    }
    // 如果x軸一樣，y小的為最小
    if (prevX === currX && prevY < currY) {
      return prev;
    }
    // 如果y軸一樣，x小的為最小
    if (prevY === currY && prevX < currX) {
      return prev;
    }
    return curr;
  }, null);
  return baseLeftItem;
}


/*
以左上角的拼圖為基準，重新安排大家的座標
basePointId: 左上角的拼圖的id,
puzzleData: 需要重新安排座標的拼圖們
x: 左上角的拼圖的x位置
y: 左上角的拼圖的y位置
*/
function reArrangePuzzlePosition(basePointId: number, puzzleData: PuzzleItem[], x: number, y: number) {
  const baseData = puzzleData.find(i => i.id === basePointId);
  if (!baseData) {
    return;
  }
  const updatedData = puzzleData.map((datum) => {
    // 如果是基準座標
    if (R.equals(datum.coordinate, baseData.coordinate)) {
      return {
        ...datum,
        left: x,
        top: y
      }
    } else {
      return {
        ...datum,
        left: x + (datum.coordinate[0] - baseData.coordinate[0]) * PuzzleWidthInPx,
        top: y + (datum.coordinate[1] - baseData.coordinate[1]) * PuzzleHeightInPx
      }
    }
  });
  return updatedData;
}

export {
  updateDataById,
  checkCloserPuzzle,
  randomNumberInRange,
  calcPuzzlesPosition,
  findLeftTopBaseItem,
  reArrangePuzzlePosition,
  handleSnapPuzzle,
  handleCombinedList
};
