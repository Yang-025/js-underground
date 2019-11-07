import * as R from 'ramda';
import uuid from 'uuid';
import { PuzzleItem, CombinedList } from './interface';
import { SnapThresholdInPx, PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';
import * as Utils2 from './utils2';

/**
 * 更新列裡某id的資料
 * @param id uniq的id
 * @param newObj 要更新的資料物件
 * @param currentData 原本的資料陣列
 */
function updateDataById<T>(id: number, newObj: T, currentData: T[]): Array<T> {
  return R.map(
    R.when(R.propEq('id', id), () => newObj),
    currentData);
}


/**
 * 以上右下左為順序，回傳此座標的鄰居
 * @param coordinate 座標
 */
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


/**
 * 如果有很靠近的拼圖可以拼起來，就回傳此鄰居的id
 * @param id 
 * @param puzzleList 
 */
function checkCloserPuzzle(id: number, puzzleList: PuzzleItem[]): number[] {
  let res: number[] = [];

  // Step. 檢查dragedItem有沒有靠近鄰居，有就放到list裡面
  const dragedItem = puzzleList.find(x => x.id === id);
  // 找出dragedItem的鄰居座標，最多可以有四個鄰居
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

        // TODO 判斷能不能結合有點右偏也可以
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

        // 如果上面的拼圖可以結合，而此座標的確是在dragedItem上方
        if (TopOneCanSnap && targetIndex === 0) {
          res.push(candidate.id);
        }
        // 如果上面的拼圖可以結合，而此座標的確是在dragedItem右方
        if (RightOneCanSnap && targetIndex === 1) {
          res.push(candidate.id);
        }
        // 如果上面的拼圖可以結合，而此座標的確是在dragedItem下方
        if (BottomOneCanSnap && targetIndex === 2) {
          res.push(candidate.id);
        }
        // 如果上面的拼圖可以結合，而此座標的確是在dragedItem左方
        if (LeftOneCanSnap && targetIndex === 3) {
          res.push(candidate.id);
        }
      };
    })
  return res;
}




/**
 * 以正在拖移的拼圖的鄰居為準，重新計算正在拖移的拼圖的座標(看起來的感覺就會像是正在拖移的拼圖吸到鄰居隔壁)
 * @param draggedItem 正在拖移的拼圖
 * @param canSnapItem 可以拼起來的拼圖
 */
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
 * 在現有拼圖List中，更新其中幾項物件
 * @param someUpdatedPuzzles 要更新的物件們
 * @param currentPuzzleList 所有拼圖的座標
 */
function updateSomeItemInPuzzles(someUpdatedPuzzles: PuzzleItem[], currentPuzzleList: PuzzleItem[]) {
  return currentPuzzleList.map(x => {
    if (someUpdatedPuzzles.map(i => i.id).includes(x.id)) {
      return someUpdatedPuzzles.find(j => j.id === x.id)!;
    }
    return x;
  })
}


/**
 * 
 * @param basePointId 左上角的拼圖id
 * @param puzlleAndNeighbor 需要重新安排座標的拼圖們
 * @param x 左上角最新的x座標
 * @param y 左上角最新的y座標
 */
function reArrangePuzzlePosition(basePointId: number, puzlleAndNeighbor: PuzzleItem[], x: number, y: number) {
  const baseData = puzlleAndNeighbor.find(i => i.id === basePointId);
  if (!baseData) {
    console.error('沒有找到左上角，不能安排位置');
    return puzlleAndNeighbor;
  }
  const updatedData = puzlleAndNeighbor.map((datum) => {
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


/**
 * handle 拼起來的動作
 * closerItems: 可以組隊的拼圖
 * puzzleList: 所有拼圖資訊
 * dragedItem: 目前被移動的拼圖
 * 回傳更新座標的puzzleList
 */
function handleSnapPuzzle(closerItems: PuzzleItem[], puzzleList: PuzzleItem[], dragedItem: PuzzleItem): PuzzleItem[] {
  // 兩個拼圖相拼。正在拖移的拼圖去吸附在鄰居身上
  if (closerItems.length === 1) {
    let calcRes = calcPuzzlesPosition(dragedItem, closerItems[0]);
    const updatedData = updateDataById(dragedItem.id, calcRes, puzzleList);
    return updatedData;
  }

  // 兩個以上的拼圖相拼。以最左邊的拼圖為基準點，重新去計算調整其他的拼圖位置
  if (closerItems.length > 1) {
    // 找出左上角的拼圖id
    const puzlleAndNeighborIdList = [dragedItem.id, ...closerItems.map(i => i.id)];
    let leftTopPuzzleId = Math.min(...puzlleAndNeighborIdList);
    let leftTopPuzzle = puzzleList.find(i => i.id === leftTopPuzzleId)!;
    let puzlleAndNeighbor = puzzleList.filter(i => puzlleAndNeighborIdList.includes(i.id));
    const updatedPuzlleAndNeighbor = reArrangePuzzlePosition(leftTopPuzzleId, puzlleAndNeighbor, leftTopPuzzle.left, leftTopPuzzle.top);
    const updatedPuzzleList = updateSomeItemInPuzzles(updatedPuzlleAndNeighbor, puzzleList);
    return updatedPuzzleList;
  }
  return puzzleList;
}

function handleGroupSnapPuzzle(newNeighborIdList: number[], puzzleList: PuzzleItem[], groupIdList: number[]) {
  // 找出左上角的拼圖id
  const puzlleAndNeighborIdList = [...groupIdList, ...newNeighborIdList];
  let leftTopPuzzleId = Math.min(...puzlleAndNeighborIdList);
  // 左上角的項目
  let leftTopPuzzle = puzzleList.find(i => i.id === leftTopPuzzleId)!;
  let puzlleAndNeighbor = puzzleList.filter(i => puzlleAndNeighborIdList.includes(i.id));
  const updatedPuzlleAndNeighbor = reArrangePuzzlePosition(leftTopPuzzleId, puzlleAndNeighbor, leftTopPuzzle.left, leftTopPuzzle.top);
  const updatedPuzzleList = updateSomeItemInPuzzles(updatedPuzlleAndNeighbor, puzzleList);
  return updatedPuzzleList;
}



/**
 * 更新組隊資訊和拼圖資訊
 * @param currentCombinedList 已經組隊的拼圖資訊
 * @param puzzleList 所有拼圖物件
 * @param combinedIdList 正要組隊的ld list
 */
function handleCombinedList(currentCombinedList: CombinedList[], puzzleList: PuzzleItem[], combinedIdList: number[]) {
  // console.log('combinedIdListcombinedIdList', combinedIdList);

  // Step. 先加一組新的
  let tmpCombinedList = [
    ...currentCombinedList,
    {
      id: uuid.v4(),
      pieces: combinedIdList
    }
  ];
  console.log('tmpCombinedListtmpCombinedListtmpCombinedList', tmpCombinedList);

  // Step. 把上一部更新完的CombinedList掃一遍，同樣的拼圖id如果出現在多個不同物件裡，就要合在一起
  // let updatedCombinedList = Utils2.mergeDuplicateInCombinedList(tmpCombinedList, puzzleList);
// 
  // Step2. 如果是上下左右的關係，就結成同一組
  let finalCombinedList = Utils2.findNeighborInCombinedList(tmpCombinedList, puzzleList);

  // Step3. 重算座標。組合完座標可能會改變(一群一群的結合，要再找出新的左上角，從新分配所有座標)
  let finalPuzzleList = finalCombinedList.reduce(
    (prev: PuzzleItem[], curr: CombinedList) => {
      // 找出左上角的拼圖id
      let leftTopPuzzleId = Math.min(...curr.pieces);
      let leftTopPuzzle = prev.find(i => i.id === leftTopPuzzleId)!;
      let neighborPuzzles = prev.filter(i => curr.pieces.includes(i.id));
      const updatedPuzlleAndNeighbor = reArrangePuzzlePosition(leftTopPuzzleId, neighborPuzzles, leftTopPuzzle.left, leftTopPuzzle.top);
      const updatedPuzzleList = updateSomeItemInPuzzles(updatedPuzlleAndNeighbor, puzzleList);
      return updatedPuzzleList;
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

export {
  updateDataById,
  checkCloserPuzzle,
  randomNumberInRange,
  reArrangePuzzlePosition,
  updateSomeItemInPuzzles,
  handleSnapPuzzle,
  handleCombinedList,
  handleGroupSnapPuzzle
};
