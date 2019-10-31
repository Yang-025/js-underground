import React, { Fragment, useRef, RefObject, useEffect, useState } from 'react';
// import Draggable from './Draggable';
import Draggable, { DraggableCore } from "react-draggable";


import { PuzzleItem, ELineDirection } from './interface';
import { StyledPuzzlePiece, StyledLine } from './Styles';
import { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';


interface IProps {
  data: PuzzleItem
  handleDrag: (id: number, left: number, top: number) => void
  handleDragStop: () => void
  highlight: boolean
  isActive: boolean
}

const PuzzlePieceSvg: React.FC<IProps> = (props) => {
  const { isActive, highlight, data: puzzleData, handleDrag, handleDragStop } = props;

  return (
    <Fragment>
      <Draggable
        bounds="body"
        onDrag={(event, data) => {
          // 不要在bubble去拖拉事件了
          event.preventDefault();
          handleDrag(puzzleData.id, data.x, data.y);
        }}
        onStop={handleDragStop}
        position={{ x: puzzleData.left, y: puzzleData.top }}
      >
        <g>
          <image xlinkHref={puzzleData.imgSrc} x={puzzleData.imgPosition.left} y={puzzleData.imgPosition.top} />
        </g>
      </Draggable>
      {
        isActive && (
          <Fragment>
            {/* 左垂直線 */}
            <line x1={puzzleData.left} x2={puzzleData.left} y1={0} y2={1000} stroke="black" strokeDasharray="10" />
            {/* 右垂直線 */}
            <line x1={puzzleData.left + PuzzleWidthInPx} x2={puzzleData.left + PuzzleWidthInPx} y1={0} y2={1000} stroke="black" strokeDasharray="10" />
            {/* 上水平線 */}
            <line x1={0} x2={1000} y1={puzzleData.top} y2={puzzleData.top} stroke="black" strokeDasharray="10" />
            {/* 下水平線 */}
            <line x1={0} x2={1000} y1={puzzleData.top + PuzzleHeightInPx} y2={puzzleData.top + PuzzleHeightInPx} stroke="black" strokeDasharray="10" />
          </Fragment>
        )
      }

    </Fragment>
  );
}

export default PuzzlePieceSvg;
