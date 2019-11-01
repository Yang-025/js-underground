import React, { useRef, RefObject, useEffect, useState } from 'react';
import * as R from 'ramda';
import StyledDemo from './DemoStyles';
import PuzzlePiece from './PuzzlePiece';
import PuzzlePieceSvg from './PuzzlePieceSvg';
import CombinedPuzzlePieceSvg from './CombinedPuzzlePieceSvg';
import ItemTypes from './ItemTypes';
import { PuzzleItem } from './interface';
import * as Utils from './utils';
import defaultPuzzleList, { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';
import Draggable, { DraggableCore } from "react-draggable";
import { func } from 'prop-types';


const Demo: React.FC = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [puzzleList, setPuzzleList] = useState<PuzzleItem[]>(defaultPuzzleList);
  const [highlightList, setHighlightList] = useState<number[]>([]);
  const [activePuzzleId, setActivePuzzleId] = useState<number>(-1);
  const [combinedList, setCombinedList] = useState<{id: string, pieces: number[][]}[]>([
    {
      id: 'c1',
      pieces: [[0, 0], [1, 0], [0, 1]]
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


  function calcPosition(draggedItem: PuzzleItem, comparedItem: PuzzleItem) {
    let newInfo = { ...draggedItem }
    const canMergeCoordinateInfo = draggedItem.canMergeCoordinate.find(x => R.equals(x.coordinate, comparedItem.coordinate));
    if (canMergeCoordinateInfo) {
      if (canMergeCoordinateInfo.direction === 'right') {
        newInfo = {
          ...draggedItem,
          left: comparedItem.left - PuzzleWidthInPx,
          top: comparedItem.top,
        }
      } else {
        console.log('TODO')
      }
    }
    return newInfo;
  }

  function handleDragStop() {
    if (isMoving) {
      setIsMoving(false);
    }
    // TODO
    // 如果有靠近的拼圖，就把他們拼再一起，並合成同一組，之後可以一起拖拉
    // 假設可以和的item是[1,0]
    // const someRes = [1, 0];
    const someRes = [1, 0];
    const puzzleItem = puzzleList.find((item: PuzzleItem) => item.id === activePuzzleId);
    const someResPuzzleItem = puzzleList.find((item: PuzzleItem) => R.equals(item.coordinate, someRes));
    if (puzzleItem && someResPuzzleItem) {
      let calcRes = calcPosition(puzzleItem, someResPuzzleItem);
      const updatedData = Utils.updateDataById(puzzleItem.id, calcRes, puzzleList);
      setPuzzleList(updatedData);
    }
    setHighlightList([]);
    setActivePuzzleId(-1);
  }


  function handleCombinedDrag(puzzleItems: PuzzleItem[]) {
    // TODO isMoving要吃list
    console.log('[combinedList]handleDrag');
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
        {/* {
          combinedList.map((items) => {
            return (
              <CombinedPuzzlePieceSvg
                key={items.id}
                id={items.id}
                combinedPointList={items.pieces}
                data={puzzleList.filter(x => {
                  return items.pieces.find(y => R.equals(x.coordinate, y));
                })}
                // TODO 怎麼套成ICombinedItemsHandleDrag
                handleDrag={handleCombinedDrag}
                handleDragStop={() => {
                  console.log('[combinedList]handleDragStop');
                  handleCombinedDragStop();
                }}
              />
            )
          })
        } */}
        {puzzleList.map(item => {
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
