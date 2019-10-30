import * as R from 'ramda';
import { PuzzleItem } from './interface';
import { SnapThresholdInPx, PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';


function updateDataById<T>(id: number, newObj: T, currentData: T[]): Array<T> {
  return R.map(
    R.when(R.propEq('id', id), () => { return newObj; }),
    currentData);
}


// 如果有很靠近的item可以拼起來就回傳id
function checkCloser(id: number, puzzleList: PuzzleItem[]): number[] {
  let res: number[] = [];
  // 每塊拼圖最多可以有四個鄰居。檢查四個鄰居有沒有接近的項目，有就放到list裡面
  const dragedItem = puzzleList.find(x => x.id === id);
  let checkList = dragedItem && dragedItem.canMergeCoordinate.map(x => puzzleList.find(i => R.equals(i.coordinate, x.coordinate)));

  dragedItem && checkList &&
    checkList.forEach(candidate => {
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


        // 從上面碰撞到別的item
        const collidAtTop = leftInBounds && rightInBounds && bottomInBounds && !topInBounds;
        // 從下面碰撞到別的item
        const collidAtBottom = leftInBounds && rightInBounds && !bottomInBounds && topInBounds;
        // 從右邊碰撞到別的item
        const collidAtRight = leftInBounds && !rightInBounds && bottomInBounds && topInBounds;
        // 從左邊碰撞到別的item
        const collidAtLeft = !leftInBounds && rightInBounds && bottomInBounds && topInBounds;


        // candidate
        const { direction } = dragedItem.canMergeCoordinate.find(x => R.equals(x.coordinate, candidate.coordinate))!;
        if (direction === 'right' && collidAtLeft) {
          res.push(candidate.id);
        }
        if (direction === 'left' && collidAtRight) {
          res.push(candidate.id);
        }
        if (direction === 'top' && collidAtBottom) {
          res.push(candidate.id);
        }
        if (direction === 'bottom' && collidAtTop) {
          res.push(candidate.id);
        }
      };
    })
  return res;
}


// function dealSnapping(params:type) {
  
// }

export { updateDataById, checkCloser };
