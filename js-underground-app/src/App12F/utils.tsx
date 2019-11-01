import * as R from 'ramda';
import { PuzzleItem } from './interface';
import { SnapThresholdInPx, PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';
import { func, number } from 'prop-types';


function updateDataById<T>(id: number, newObj: T, currentData: T[]): Array<T> {
  return R.map(
    R.when(R.propEq('id', id), () => { return newObj; }),
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


// function dealSnapping(params:type) {

// }


// 隨機產生某範圍內的數字
function randomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { updateDataById, checkCloserPuzzle, randomNumberInRange };
