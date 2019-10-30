import React, { useRef, RefObject, useEffect, useState } from 'react';
import * as R from 'ramda';
import StyledDemo from './DemoStyles';
import PuzzlePiece from './PuzzlePiece';
import ItemTypes from './ItemTypes';
import { PuzzleItem } from './interface';
import * as Utils from './utils';
import defaultPuzzleList, { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';


const Demo: React.FC = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [puzzleList, setPuzzleList] = useState<PuzzleItem[]>(defaultPuzzleList);
  const [highlightList, setHighlightList] = useState<number[]>([]);
  const [activePuzzleId, setActivePuzzleId] = useState<number>(-1);


  // x: item左上角的x座標
  // y: item左上角的y座標
  function handleDrag(id: number, x: number, y: number) {
    if (!isMoving) {
      setIsMoving(true);
    }
    // 找到目前在drag的item
    const selectedItem = puzzleList.find(item => item.id === id);
    if (!selectedItem) {
      return;
    }

    // 更新目前在drag的item的座標
    const updatedData = Utils.updateDataById(
      selectedItem.id,
      {
        ...selectedItem,
        left: x,
        top: y
      },
      puzzleList);
    setPuzzleList(updatedData);

    // set目前在drag的item
    setActivePuzzleId(id);
    // 找出有沒有可以snap的拼圖
    const closerItemList = Utils.checkCloser(id, puzzleList);
    setHighlightList(closerItemList);
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
    console.log('highlightList', highlightList);
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


  return (
    <StyledDemo style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {puzzleList.map(item => {
        return (
          <PuzzlePiece
            handleDrag={handleDrag}
            handleDragStop={handleDragStop}
            data={item}
            key={item.id}
            highlight={highlightList.includes(item.id)}
            isActive={item.id === activePuzzleId}
          />
        )
      })}
    </StyledDemo>
  );
}

export default Demo;
