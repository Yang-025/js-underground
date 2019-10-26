import React, { useRef, RefObject, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';

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


const defaultPuzzleList = [
  {
    id: 1,
    name: 'puzzle1',
    imgSrc: Puzzle1,
    canMerge: [2, 4],
    imgPosition: { left: '0px', top: '0px' },
    type: ItemTypes.PIECE,
    left: 40,
    top: 40,
  },
  {
    id: 2,
    name: 'puzzle2',
    imgSrc: Puzzle2,
    canMerge: [1, 3, 5],
    imgPosition: { left: '-28px', top: '0px' },
    type: ItemTypes.PIECE,
    left: 100,
    top: 100,
  },
  // {
  //   id: 3,
  //   name: 'puzzle3',
  //   imgSrc: Puzzle3,
  //   canMerge: [2, 6],
  //   imgPosition: { right: '0px', top: '0px' }
  // },
  // {
  //   id: 4,
  //   name: 'puzzle4',
  //   imgSrc: Puzzle4,
  //   canMerge: [1, 5],
  //   imgPosition: { left: '0px', top: '0px' }
  // },
  // {
  //   id: 5,
  //   name: 'puzzle5',
  //   imgSrc: Puzzle5,
  //   canMerge: [2, 4, 6, 8],
  //   imgPosition: { left: '0px', top: '-28px' }
  // },
  // {
  //   id: 6,
  //   name: 'puzzle6',
  //   imgSrc: Puzzle6,
  //   canMerge: [3, 5, 9],
  //   imgPosition: { right: '0px', top: '0px' }
  // },
  // {
  //   id: 7,
  //   name: 'puzzle7',
  //   imgSrc: Puzzle7,
  //   canMerge: [4, 8],
  //   imgPosition: { left: '0px', top: '-28px' }
  // },
  // {
  //   id: 8,
  //   name: 'puzzle8',
  //   imgSrc: Puzzle8,
  //   canMerge: [5, 7, 9],
  //   imgPosition: { left: '-28px', bottom: '0px' }
  // },
  // {
  //   id: 9,
  //   name: 'puzzle9',
  //   imgSrc: Puzzle9,
  //   canMerge: [6, 8],
  //   imgPosition: { right: '0px', bottom: '0px' }
  // },
]

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
    <StyledDemo style={{ position: 'relative' }} ref={dragWrapperEl}>
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
