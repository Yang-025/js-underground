import React, { useRef, RefObject, useEffect, useState } from 'react';
import * as R from 'ramda';
import StyledDemo from './DemoStyles';
import PuzzlePiece from './PuzzlePiece';
import PuzzlePieceSvg from './PuzzlePieceSvg';
import CombinedPuzzlePieceSvg from './CombinedPuzzlePieceSvg';
import ItemTypes from './ItemTypes';
import { PuzzleItem, CombinedList } from './interface';
import * as Utils from './utils';
import defaultPuzzleList, { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';
import Draggable, { DraggableCore } from "react-draggable";
import { func } from 'prop-types';


const Demo: React.FC = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [puzzleList, setPuzzleList] = useState<PuzzleItem[]>(defaultPuzzleList);
  const [highlightList, setHighlightList] = useState<number[]>([]);
  const [activePuzzleId, setActivePuzzleId] = useState<number>(-1);
  const [combinedList, setCombinedList] = useState<CombinedList[]>([
    // {
    //   id: 'c1',
    //   pieces: [0, 1, 3],
    // }
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
    const dragedItem = puzzleList.find((item: PuzzleItem) => item.id === activePuzzleId);
    if (!dragedItem) {
      return;
    }


    const closerItems = puzzleList.filter((item => highlightList.includes(item.id)));
    if (closerItems.length > 0) {
      console.log('closerItems', closerItems);
      let tmpUpdatedData = Utils.handleSnapPuzzle(closerItems, puzzleList, dragedItem);
      // setPuzzleList(updatedData);

      // TODO setCombinedList
      // TODO 組合完座標可能會改變(一群一群的結合，要再找出新的左上角，從新分配所有座標)
      let updatedData = Utils.handleCombinedList(combinedList, tmpUpdatedData, [dragedItem.id, ...closerItems.map(x => x.id)]);
      console.log('newData', updatedData);
      const { combineList: updatedCombineList, puzzleList: updatedPuzzleList } = updatedData;
      setCombinedList(updatedCombineList);
      setPuzzleList(updatedPuzzleList);
    }


    setHighlightList([]);
    setActivePuzzleId(-1);
  }


  function handleCombinedDrag(puzzleItems: PuzzleItem[]) {
    // TODO isMoving要吃list
    console.log('[handleCombinedDrag]handleDrag');
    let updated = puzzleList.map(x => {
      const target = puzzleItems.find(y => y.id === x.id)
      if (target) {
        return target
      }
      return x
    })
    setPuzzleList(updated);
  }

  function handleCombinedDragStop() {
    // TODO isMoving要吃list
  }

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
                handleDrag={handleCombinedDrag}
                handleDragStop={() => {
                  handleCombinedDragStop();
                }}
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
