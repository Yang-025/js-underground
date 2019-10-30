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

const PuzzlePiece: React.FC<IProps> = (props) => {
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
        // defaultPosition={{ x: puzzleData.left, y: puzzleData.top }}
        position={{ x: puzzleData.left, y: puzzleData.top }}
      >
        <div style={{ position: 'absolute', zIndex: isActive ? 2 : 1 }}>
          <StyledPuzzlePiece highlight={highlight}>
            <img style={{ ...puzzleData.imgPosition }} src={puzzleData.imgSrc} alt="" />
          </StyledPuzzlePiece>
        </div>
      </Draggable>
      {
        isActive && (
          <Fragment>
            {/* 左垂直線 */}
            <StyledLine way={ELineDirection.vertical} left={puzzleData.left} top={0} />
            {/* 右垂直線 */}
            <StyledLine way={ELineDirection.vertical} left={puzzleData.left + PuzzleWidthInPx} top={0} />
            {/* 上水平線 */}
            <StyledLine way={ELineDirection.horizontal} left={0} top={puzzleData.top} />
            {/* 下水平線 */}
            <StyledLine way={ELineDirection.horizontal} left={0} top={puzzleData.top + PuzzleHeightInPx} />
          </Fragment>
        )
      }

    </Fragment>
  );
}

export default PuzzlePiece;
