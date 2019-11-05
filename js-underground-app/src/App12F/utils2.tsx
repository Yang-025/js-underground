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


/**
 * 更新組隊資訊和拼圖資訊
 * @param currentCombinedList 已經組隊的拼圖資訊
 * @param puzzleList 所有拼圖物件
 * @param combinedIdList 正要組隊的ld list
 */
function handleGroupCombinedList(currentCombinedList: CombinedList[], puzzleList: PuzzleItem[], activeId: string | number, combinedIdList: number[]) {

  let tmpUpdatedCombinedList = currentCombinedList.map(item => {
    if (item.id === activeId) {
      return {
        ...item,
        pieces: combinedIdList
      }
    }
    return item;
  });
  console.log('///>>>>>updatedCombinedList', tmpUpdatedCombinedList);
  console.log('///>>>>>updatedCombinedList2', currentCombinedList.filter(item => R.intersection(item.pieces, combinedIdList).length > 0));


  /* ********* */
  let skipIdList: string[] = [];
  let updatedCombinedList: CombinedList[] = [];

  tmpUpdatedCombinedList.forEach(item => {
    const { pieces, id } = item;
    if (skipIdList.includes(id)) {
      return;
    }
    // 如果曾經跟prev的id有交集的話，就要合體
    const intersectionList = tmpUpdatedCombinedList.filter(i => R.intersection(i.pieces, pieces).length > 0);
    if (intersectionList.length > 0) {
      skipIdList = [...skipIdList, ...intersectionList.map(j => j.id)];
      const piecesList = R.uniq(R.flatten(intersectionList.map(j => j.pieces)));
      updatedCombinedList = [
        ...updatedCombinedList,
        {
          id: id,
          pieces: piecesList
        }
      ]
    } else {
      updatedCombinedList = [
        ...updatedCombinedList,
        item
      ]
    }
  })
  /* ********* */

  // Step1.如果有一樣的id，就結成同一組
  // const hasIntersection = currentCombinedList.find(item => R.intersection(item.pieces, combinedIdList).length > 0);
  // let tmpCombinedList = [];
  // if (hasIntersection) {
  //   tmpCombinedList = currentCombinedList.map(item => {
  //     if (item.id === hasIntersection.id) {
  //       return {
  //         ...item,
  //         pieces: R.union(hasIntersection.pieces, combinedIdList).sort()
  //       }
  //     } else {
  //       return item;
  //     }
  //   })
  // } else {
  //   // 否則，就增加一組
  //   tmpCombinedList = [
  //     ...currentCombinedList,
  //     {
  //       id: uuid.v4(),
  //       pieces: combinedIdList.sort()
  //     }
  //   ]
  // }


  // Step2. 如果是上下左右的關係，就結成同一組
  let finalCombinedList = findNeighborInCombinedList(updatedCombinedList, puzzleList);

  // Step3. 重算座標。組合完座標可能會改變(一群一群的結合，要再找出新的左上角，從新分配所有座標)
  let finalPuzzleList = finalCombinedList.reduce(
    (prev: PuzzleItem[], curr: CombinedList) => {
      // 找出左上角的拼圖id
      let leftTopPuzzleId = Math.min(...curr.pieces);
      let leftTopPuzzle = prev.find(i => i.id === leftTopPuzzleId)!;
      let neighborPuzzles = prev.filter(i => curr.pieces.includes(i.id));
      const updatedPuzlleAndNeighbor = Utils.reArrangePuzzlePosition(leftTopPuzzleId, neighborPuzzles, leftTopPuzzle.left, leftTopPuzzle.top);
      const updatedPuzzleList = Utils.updateSomeItemInPuzzles(updatedPuzlleAndNeighbor, puzzleList);
      return updatedPuzzleList;
    }, puzzleList);

  return {
    combineList: finalCombinedList,
    puzzleList: finalPuzzleList
  }
}


export { findNeighborInCombinedList, handleGroupCombinedList };
