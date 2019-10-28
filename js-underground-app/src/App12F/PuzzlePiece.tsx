import React, { Fragment, useRef, RefObject, useEffect, useState } from 'react';
// import Draggable from './Draggable';
import Draggable, { DraggableCore } from "react-draggable";


import ItemTypes from './ItemTypes';
import { PuzzleItem, ReferenceLine } from './interface';
import { StyledPuzzlePiece, StyledLine } from './Styles';

interface IProps {
  data: PuzzleItem
  handleDrag: (id: number, left: number, top: number, deltaX: number, deltaY: number) => void
  handleDragStop: () => void
  highlight: boolean
  // parentRef: HTMLDivElement | null
}

const PuzzlePiece: React.FC<IProps> = ({ handleDragStop, highlight, data: puzzleData, handleDrag }) => {
  const [referenceLine, setReferenceLine] = useState<ReferenceLine>({ x: puzzleData.left, y: puzzleData.top });

  return (
    <Fragment>
      <Draggable
        bounds="parent"
        onDrag={(event, data) => {
          // 不要在bubble去拖拉事件了
          event.preventDefault();
          setReferenceLine((preState) => {
            return { x: preState.x + data.deltaX, y: preState.y + data.deltaY }
          });
          handleDrag(puzzleData.id, data.x, data.y, data.deltaX, data.deltaX);
          console.log('hi', data, event);
        }}
        onStop={handleDragStop}
        positionOffset={{ x: puzzleData.left, y: puzzleData.top }}
      >
        <div style={{ position: 'absolute' }}>
          <StyledPuzzlePiece highlight={highlight}>
            <img style={{ ...puzzleData.imgPosition }} src={puzzleData.imgSrc} alt="" />
          </StyledPuzzlePiece>
        </div>
      </Draggable>
      {/* 左垂直線 */}
      {/* <StyledLine left={referenceLine.x} top={referenceLine.y} /> */}
    </Fragment>
  );
}

export default PuzzlePiece;
