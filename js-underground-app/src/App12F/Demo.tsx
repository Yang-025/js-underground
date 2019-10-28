import React, { useRef, RefObject, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import Draggable, { DraggableCore } from "react-draggable";


import Puzzle1 from './assets/Puzzle-1.png';
import Puzzle2 from './assets/Puzzle-2.png';
import Puzzle3 from './assets/Puzzle-3.png';
import Puzzle4 from './assets/Puzzle-4.png';
import Puzzle5 from './assets/Puzzle-5.png';
import Puzzle6 from './assets/Puzzle-6.png';
import Puzzle7 from './assets/Puzzle-7.png';
import Puzzle8 from './assets/Puzzle-8.png';
import Puzzle9 from './assets/Puzzle-9.png';
import StyledDemo from './DemoStyles';
import PuzzlePiece from './PuzzlePiece';
import ItemTypes from './ItemTypes';
import { PuzzleItem, ReferenceLine } from './interface';
import * as Utils from './utils';
import { StyledPuzzlePiece, StyledLine } from './Styles';
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
      {/* {puzzleList.map(item => {
        return (
          <PuzzlePiece
            handleDrag={handleDrag}
            handleDragStop={handleDragStop}
            data={item}
            key={item.id}
            highlight={highlightList.includes(item.id)}
          />
        )
      })} */}
      <PuzzlePiece
        handleDrag={handleDrag}
        handleDragStop={handleDragStop}
        data={puzzleList[0]}
        key={puzzleList[0].id}
        highlight={highlightList.includes(puzzleList[0].id)}
      />
      <PuzzlePiece
        handleDrag={handleDrag}
        handleDragStop={handleDragStop}
        data={puzzleList[1]}
        key={puzzleList[1].id}
        highlight={highlightList.includes(puzzleList[1].id)}
      />
    </StyledDemo>
  );
}

export default Demo;
