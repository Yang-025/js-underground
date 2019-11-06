import React, { useRef, RefObject, useEffect, useState } from 'react';
import * as R from 'ramda';
import StyledDemo from './DemoStyles';
import PuzzlePiece from './PuzzlePiece';
import PuzzlePieceSvg from './PuzzlePieceSvg';
import CombinedPuzzlePieceSvg from './CombinedPuzzlePieceSvg';
import ItemTypes from './ItemTypes';
import { PuzzleItem, CombinedList } from './interface';
import * as Utils from './utils';
import * as Utils2 from './utils2';
import defaultPuzzleList, { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';
import Draggable, { DraggableCore } from "react-draggable";
import { func } from 'prop-types';


const Demo: React.FC = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [puzzleList, setPuzzleList] = useState<PuzzleItem[]>(defaultPuzzleList);
  const [highlightList, setHighlightList] = useState<number[]>([]);
  const [activePuzzleId, setActivePuzzleId] = useState<number | string>(-1);
  const [combinedList, setCombinedList] = useState<CombinedList[]>([
    {
      id: 'c1',
      pieces: [0, 1, 3],
    },
    {
      id: 'c2',
      pieces: [2, 4, 5],
    }
  ]);

  // x: item左上角的x座標
  // y: item左上角的y座標
  function handleDrag(id: number, x: number, y: number) {
    if (!isMoving) {
      setIsMoving(true);
    }

    // 找到目前在drag的拼圖
    const selectedItem = puzzleList.find(item => item.id === id);
    if (!selectedItem) {
      return;
    }

    // 更新目前在drag的拼圖的座標
    const updatedData = Utils.updateDataById(
      selectedItem.id,
      {
        ...selectedItem,
        left: x,
        top: y
      },
      puzzleList);
    setPuzzleList(updatedData);

    // 更新目前在drag的拼圖id
    setActivePuzzleId(id);

    // 找出有沒有可以拼在一起的拼圖
    const closerPuzzleList = Utils.checkCloserPuzzle(id, puzzleList);
    setHighlightList(closerPuzzleList);
  }

  function handleDragStop() {
    if (isMoving) {
      setIsMoving(false);
    }
    const dragedItem = puzzleList.find(item => item.id === activePuzzleId);
    if (!dragedItem) {
      return;
    }


    const closerItems = puzzleList.filter((item => highlightList.includes(item.id)));
    if (closerItems.length > 0) {
      let tmpUpdatedPuzzleList = Utils.handleSnapPuzzle(closerItems, puzzleList, dragedItem);
      // 更新組隊資訊和拼圖資訊。
      const { combineList: updatedCombineList,
        puzzleList: updatedPuzzleList } = Utils.handleCombinedList(combinedList, tmpUpdatedPuzzleList, [dragedItem.id, ...closerItems.map(x => x.id)]);
      setCombinedList(updatedCombineList);
      setPuzzleList(updatedPuzzleList);
    }

    setHighlightList([]);
    setActivePuzzleId(-1);
  }


  function handleCombinedDrag(someUpdatedPuzzles: PuzzleItem[], id: string) {
    if (!isMoving) {
      setIsMoving(true);
    }

    // 更新目前在drag的拼圖id
    setActivePuzzleId(id);

    // 更新拼圖座標
    const updated = Utils.updateSomeItemInPuzzles(someUpdatedPuzzles, puzzleList);
    setPuzzleList(updated);

    // 找出有沒有可以拼在一起的拼圖
    let final: number[] = [];
    someUpdatedPuzzles.forEach(curr => {
      // 找出每個拼圖很靠近的鄰居
      const tmpCloserPuzzleList = Utils.checkCloserPuzzle(curr.id, updated);
      // 從每個拼圖很靠近的鄰居中，找出新的鄰居(還沒有在同一組的)
      const newNeighborList = R.difference(tmpCloserPuzzleList, someUpdatedPuzzles.map(i => i.id));
      if (tmpCloserPuzzleList.length > 0 && newNeighborList.length > 0) {
        final = [
          ...final,
          ...newNeighborList
        ]
      }
    });
    setHighlightList(R.uniq(final));
  }

  function handleCombinedDragStop() {
    if (isMoving) {
      setIsMoving(false);
    }


    const dragedItems = combinedList.find(item => item.id === activePuzzleId);
    if (!dragedItems) {
      return;
    }

    let tmpUpdatedPuzzleList = Utils.handleGroupSnapPuzzle(highlightList, puzzleList, dragedItems.pieces);
    // 更新組隊資訊和拼圖資訊。
    const { combineList: updatedCombineList,
      puzzleList: updatedPuzzleList } = Utils2.handleGroupCombinedList(combinedList, tmpUpdatedPuzzleList, activePuzzleId, [...dragedItems.pieces, ...highlightList]);

    setCombinedList(updatedCombineList);
    setPuzzleList(updatedPuzzleList);
    setHighlightList([]);
    setActivePuzzleId(-1);
  }

  console.log('combinedListcombinedListcombinedListcombinedList', combinedList);
  return (
    <StyledDemo style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <svg width="100%" height="100%" style={{ backgroundColor: "lightyellow" }}>
        {
          combinedList.map((items) => {
            return (
              <CombinedPuzzlePieceSvg
                key={items.id}
                id={items.id}
                combinedPointList={items.pieces}
                data={puzzleList.filter(x => {
                  return items.pieces.includes(x.id);
                })}
                highlight={R.intersection(highlightList, items.pieces).length > 0}
                handleDrag={handleCombinedDrag}
                handleDragStop={() => {
                  handleCombinedDragStop();
                }}
                isActive={items.id === activePuzzleId}
              />
            )
          })
        }
        {puzzleList.filter(i => !combinedList.find(j => j.pieces.includes(i.id))).map(item => {
          return (
            <PuzzlePieceSvg
              handleDrag={handleDrag}
              handleDragStop={handleDragStop}
              data={item}
              key={item.id}
              highlight={highlightList.includes(item.id)}
              isActive={item.id === activePuzzleId}
            />
          )
        })}
      </svg>
    </StyledDemo>
  );
}

export default Demo;
