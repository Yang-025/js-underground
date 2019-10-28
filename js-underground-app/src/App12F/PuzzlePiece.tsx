import React, { Fragment, useRef, RefObject, useEffect, useState } from 'react';
// import Draggable from './Draggable';
import Draggable, { DraggableCore } from "react-draggable";


import ItemTypes from './ItemTypes';
import { PuzzleItem, ReferenceLine, ELineDirection } from './interface';
import { StyledPuzzlePiece, StyledLine } from './Styles';

interface IProps {
  data: PuzzleItem
  handleDrag: (id: number, left: number, top: number, deltaX: number, deltaY: number) => void
  handleDragStop: () => void
  highlight: boolean
  // parentRef: HTMLDivElement | null
}

const PuzzlePiece: React.FC<IProps> = ({ handleDragStop, highlight, data: puzzleData, handleDrag }) => {
  const [referenceLine, setReferenceLine] = useState<ReferenceLine>({ x: puzzleData.left, y: puzzleData.top, width: puzzleData.width, height: puzzleData.height });

  return (
    <Fragment>
      <Draggable
        bounds="body"
        onDrag={(event, data) => {
          // 不要在bubble去拖拉事件了
          event.preventDefault();
          setReferenceLine((preState) => {
            return { x: preState.x + data.deltaX, y: preState.y + data.deltaY, width: puzzleData.width, height: puzzleData.height }
          });
          handleDrag(puzzleData.id, data.x, data.y, data.deltaX, data.deltaX);
          console.log('hi', data, event);
        }}
        onStop={handleDragStop}
        defaultPosition={{ x: puzzleData.left, y: puzzleData.top }}
      >
        <div style={{ position: 'absolute' }}>
          <StyledPuzzlePiece highlight={highlight}>
            <img style={{ ...puzzleData.imgPosition }} src={puzzleData.imgSrc} alt="" />
          </StyledPuzzlePiece>
        </div>
      </Draggable>
      {/* 左垂直線 */}
      <StyledLine way={ELineDirection.vertical} left={referenceLine.x} top={0} />
      {/* 右垂直線 */}
      <StyledLine way={ELineDirection.vertical} left={referenceLine.x + referenceLine.width} top={0} />
      {/* 上水平線 */}
      <StyledLine way={ELineDirection.horizontal} left={0} top={referenceLine.y} />
      {/* 下水平線 */}
      <StyledLine way={ELineDirection.horizontal} left={0} top={referenceLine.y + referenceLine.height} />
    </Fragment>
  );
}

export default PuzzlePiece;
