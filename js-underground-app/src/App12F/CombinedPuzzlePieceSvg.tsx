import React, { Fragment, useRef, RefObject, useEffect, useState } from 'react';
// import Draggable from './Draggable';
import Draggable, { DraggableCore } from "react-draggable";
import * as R from "ramda";
import * as Utils from './utils';

import { PuzzleItem } from './interface';
import { StyledPuzzlePiece, StyledLine } from './Styles';
import { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';


interface IProps {
  id: string,
  data: PuzzleItem[],
  combinedPointList: number[][],
  handleDrag: (puzzleItems: PuzzleItem[]) => void
  handleDragStop: () => void
}


const CombinedPuzzlePieceSvg: React.FC<IProps> = (props) => {
  const { id, data: combinedData, combinedPointList, handleDrag, handleDragStop } = props;
  // 找到最左上角的項目，以此項目作為參考點計算座標
  const baseLeftItem = Utils.findLeftTopBaseItem(combinedPointList);
  if (!baseLeftItem) {
    console.log('error');
    return <div />;
  }
  const position = combinedData.find(item => R.equals(item.coordinate, baseLeftItem));
  if (!position) {
    console.log('error');
    return <div />;
  }
  return (
    <Fragment>
      <Draggable
        bounds="body"
        onDrag={(event, data) => {
          // 不要在bubble去拖拉事件了
          event.preventDefault();
          const baseLeftItem = Utils.findLeftTopBaseItem(combinedPointList);
          if (!baseLeftItem) {
            return;
          }
          const updatedData = combinedData.map((datum) => {
            // 如果是基準座標
            if (R.equals(datum.coordinate, baseLeftItem)) {
              return {
                ...datum,
                left: data.x,
                top: data.y
              }
            } else {
              return {
                ...datum,
                left: data.x + (datum.coordinate[0] - baseLeftItem[0]) * PuzzleWidthInPx,
                top: data.y + (datum.coordinate[1] - baseLeftItem[1]) * PuzzleHeightInPx
              }
            }
          });
          handleDrag(updatedData);
        }}
        onStop={handleDragStop}
        // x最小，y最小的位置為準
        position={{ x: position.left, y: position.top }}
      >
        <g>
          {combinedData.map((piece) => {
            if (R.equals(piece.coordinate, baseLeftItem)) {
              return (
                <image 
                  xlinkHref={piece.imgSrc} 
                  x={piece.imgPosition.left} 
                  y={piece.imgPosition.top} 
                  transform={`translate(${0}, ${0})`} 
                />
              );
            }
            // 跟左上角比，算出相對位置
            const offsetX = (piece.coordinate[0] - baseLeftItem[0]) * PuzzleWidthInPx;
            const offsetY = (piece.coordinate[1] - baseLeftItem[1]) * PuzzleWidthInPx;
            return (
              <image 
                xlinkHref={piece.imgSrc} 
                x={piece.imgPosition.left} 
                y={piece.imgPosition.top} 
                transform={`translate(${offsetX}, ${offsetY})`} 
              />
            );
          })}
        </g>
      </Draggable>
    </Fragment>
  );
}

export default CombinedPuzzlePieceSvg;
