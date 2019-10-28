import React, { useRef, RefObject, useEffect, useState } from 'react';

import StyledDemo from './DemoStyles';
import PuzzlePiece from './PuzzlePiece';
import ItemTypes from './ItemTypes';
import { PuzzleItem } from './interface';
import * as Utils from './utils';
import defaultPuzzleList from './puzzleSetting';


const Demo: React.FC = () => {
  const [puzzleList, setPuzzleList] = useState<PuzzleItem[]>(defaultPuzzleList);
  const [highlightList, setHighlightList] = useState<number[]>([]);
  const dragWrapperEl: RefObject<HTMLDivElement> = useRef(null);


  // x: item左上角的x座標
  // y: item左上角的y座標
  function handleDrag(id: number, x: number, y: number, deltaX: number, deltaY: number) {
    // 找到data
    const selectedItem = puzzleList.find(item => item.id === id);
    if (!selectedItem) {
      return;
    }
    console.log('現在是誰在移動', id);
    const closerItemList = Utils.checkCloser(id, puzzleList);
    setHighlightList(closerItemList);
  }

  function handleDragStop() {
    setHighlightList([]);
  }


  return (
    <StyledDemo id="dd01" ref={dragWrapperEl} style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {puzzleList.map(item => {
        return (
          <PuzzlePiece
            handleDrag={handleDrag}
            handleDragStop={handleDragStop}
            data={item}
            key={item.id}
            highlight={highlightList.includes(item.id)}
          />
        )
      })}
    </StyledDemo>
  );
}

export default Demo;
