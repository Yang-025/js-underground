import * as R from 'ramda';
import uuid from 'uuid';
import { PuzzleItem, CombinedList } from './interface';
import * as Utils from './utils';


/*
檢查原本的CombinedList有沒有可以合體的組合
*/
function findNeighborInCombinedList(tmpCombinedList: CombinedList[], puzzleList: PuzzleItem[]) {
  let neighbor: CombinedList[] = [];
  tmpCombinedList.forEach(i => {
    const { pieces, id } = i;
    // 可以組隊，但是沒有分在同一組的拼圖
    let diffeGroupCanMergeIdList: number[] = [];
    pieces.forEach((piece: number) => {
      // 找出可以組隊，但是沒有分在同一組的拼圖
      let canMergeList: number[] = Utils.checkCloserPuzzle(piece, puzzleList);
      let difference: number[] = R.difference(canMergeList, pieces);
      if (difference.length > 0) {
        // 兩組合體
        diffeGroupCanMergeIdList = [
          ...diffeGroupCanMergeIdList,
          ...difference
        ];
      }
    });
    neighbor.push({
      id,
      pieces: [...pieces, ...R.uniq(diffeGroupCanMergeIdList)]
    });
  });

  const neighborIdList = neighbor.map(i => i.pieces)
    .reduce((prev: number[][], curr: number[]) => {
      if (prev.length === 0) {
        return [curr]
      } else {
        if (prev.find((x) => R.equals(x, curr), prev)) {
          return prev;
        }
        return [
          ...prev, 
          curr
        ]
      }
    }, [])
    .map(j => {
      return {
        id: uuid.v4(),
        pieces: j
      }
    })
  return neighborIdList;
}

export { findNeighborInCombinedList };
