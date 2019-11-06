import * as R from 'ramda';
import { PuzzleItem, CombinedList } from './interface';
import * as Utils from './utils';

/*
檢查原本的CombinedList有沒有可以合體的組合
*/
function findNeighborInCombinedList(currentCombinedList: CombinedList[], puzzleList: PuzzleItem[]) {
  let skipIdList: string[] = [];
  let updatedCombinedList: CombinedList[] = [];

  currentCombinedList.forEach(item => {
    const { pieces, id } = item;
    // 已經處理過就不處理
    if (skipIdList.includes(id)) {
      return;
    }

    // 每片拼圖，是否有其他可以合體的鄰居
    let newNeighbor: number[] = [];
    pieces.forEach((piece: number) => {
      let canMergeList: number[] = Utils.checkCloserPuzzle(piece, puzzleList);
      let difference: number[] = R.difference(canMergeList, pieces);
      if (difference.length > 0) {
        // 兩組合體
        newNeighbor = [
          ...newNeighbor,
          ...difference
        ];
      }
    });
    const uniqNewNeighbor = R.uniq(newNeighbor);
    // 可以合體的鄰居，是否在currentCombinedList的其他組合
    const intersectionList = currentCombinedList.filter(i => R.intersection(i.pieces, uniqNewNeighbor).length > 0);
    if (intersectionList.length > 0) {
      skipIdList = [...skipIdList, ...intersectionList.map(j => j.id)];
      const piecesList = R.uniq(R.flatten(intersectionList.map(j => j.pieces)));
      updatedCombinedList = [
        ...updatedCombinedList,
        {
          id: id,
          pieces: [...pieces, ...piecesList]
        }
      ]
    } else {
      updatedCombinedList = [
        ...updatedCombinedList,
        item
      ]
    }
  });
  return updatedCombinedList;
}


function mergeDuplicateInCombinedList(currentCombinedList: CombinedList[], puzzleList: PuzzleItem[]) {
  let skipIdList: string[] = [];
  let updatedCombinedList: CombinedList[] = [];

  currentCombinedList.forEach(item => {
    const { pieces, id } = item;
    // 已經處理過就不處理
    if (skipIdList.includes(id)) {
      return;
    }
    // 現在的組合，在tmpCombinedList的其他組合也出現過
    const intersectionList = currentCombinedList.filter(i => R.intersection(i.pieces, pieces).length > 0);
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
  });
  return updatedCombinedList;
}


/**
 * 更新組隊資訊和拼圖資訊
 * @param currentCombinedList 已經組隊的拼圖資訊
 * @param puzzleList 所有拼圖物件
 * @param combinedIdList 正要組隊的ld list
 */
function handleGroupCombinedList(currentCombinedList: CombinedList[], puzzleList: PuzzleItem[], activeId: string | number, combinedIdList: number[]) {
  // Step. 把新的鄰居加到現有的隊伍裡
  let tmpCombinedList = currentCombinedList.map(item => {
    if (item.id === activeId) {
      return {
        ...item,
        pieces: combinedIdList
      }
    }
    return item;
  });


  // Step. 把上一部更新完的CombinedList掃一遍，同樣的拼圖id如果出現在多個不同物件裡，就要合在一起
  let updatedCombinedList = mergeDuplicateInCombinedList(tmpCombinedList, puzzleList);
  // let skipIdList: string[] = [];
  // let updatedCombinedList: CombinedList[] = [];

  // tmpCombinedList.forEach(item => {
  //   const { pieces, id } = item;
  //   // 已經處理過就不處理
  //   if (skipIdList.includes(id)) {
  //     return;
  //   }
  //   // 現在的組合，在tmpCombinedList的其他組合也出現過
  //   const intersectionList = tmpCombinedList.filter(i => R.intersection(i.pieces, pieces).length > 0);
  //   if (intersectionList.length > 0) {
  //     skipIdList = [...skipIdList, ...intersectionList.map(j => j.id)];
  //     const piecesList = R.uniq(R.flatten(intersectionList.map(j => j.pieces)));
  //     updatedCombinedList = [
  //       ...updatedCombinedList,
  //       {
  //         id: id,
  //         pieces: piecesList
  //       }
  //     ]
  //   } else {
  //     updatedCombinedList = [
  //       ...updatedCombinedList,
  //       item
  //     ]
  //   }
  // });


  // Step. 檢查每一個物件的拼圖id，如果有上下左右的關係出現在別的物件，就結成同一組
  let finalCombinedList = findNeighborInCombinedList(updatedCombinedList, puzzleList);

  // Step. 重算座標。組合完座標可能會改變(一群一群的結合，要再找出新的左上角，從新分配所有座標)
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


export { findNeighborInCombinedList, handleGroupCombinedList, mergeDuplicateInCombinedList };
