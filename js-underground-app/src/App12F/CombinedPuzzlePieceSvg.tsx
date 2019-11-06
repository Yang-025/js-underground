import React, { Fragment, useRef, RefObject, useEffect, useState } from 'react';
// import Draggable from './Draggable';
import Draggable, { DraggableCore } from "react-draggable";
import * as R from "ramda";
import * as Utils from './utils';

import { PuzzleItem } from './interface';
import { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';


interface IProps {
  id: string,
  data: PuzzleItem[],
  highlight: boolean,
  isActive: boolean,
  combinedPointList: number[],
  handleDrag: (puzzleItems: PuzzleItem[], id: string) => void
  handleDragStop: () => void
}


const CombinedPuzzlePieceSvg: React.FC<IProps> = (props) => {
  const { id, data: combinedData, combinedPointList, highlight, isActive,
    handleDrag, handleDragStop } = props;
  // 找到最左上角的項目，以此項目作為參考點計算座標
  const baseLeftItemId = Math.min(...combinedPointList);
  if (!R.is(Number, baseLeftItemId)) {
    return <div />;
  }
  const baseLeftItemInfo = combinedData.find(item => item.id === baseLeftItemId);
  if (!baseLeftItemInfo) {
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
          const updatedData = Utils.reArrangePuzzlePosition(baseLeftItemInfo.id, combinedData, data.x, data.y);
          if (updatedData) {
            handleDrag(updatedData, id);
          }
        }}
        onStop={handleDragStop}
        // x最小，y最小的位置為準
        position={{ x: baseLeftItemInfo.left, y: baseLeftItemInfo.top }}
      >
        <g>
          {combinedData.map((piece) => {
            if (piece.id === baseLeftItemId) {
              return (
                <g key={piece.id}>
                  <rect x={0} y={0} width={PuzzleWidthInPx} height={PuzzleHeightInPx} fill="transparent" stroke={highlight ? 'red' : 'transparent'} strokeWidth="3" />
                  <image
                    xlinkHref={piece.imgSrc}
                    x={piece.imgPosition.left}
                    y={piece.imgPosition.top}
                    transform={`translate(${0}, ${0})`}
                  />
                </g>

              );
            }
            // 跟左上角比，算出相對位置
            const offsetX = (piece.coordinate[0] - baseLeftItemInfo.coordinate[0]) * PuzzleWidthInPx;
            const offsetY = (piece.coordinate[1] - baseLeftItemInfo.coordinate[1]) * PuzzleWidthInPx;
            return (
              <g key={piece.id}>
                <rect x={offsetX} y={offsetY} width={PuzzleWidthInPx} height={PuzzleHeightInPx} fill="transparent" stroke={highlight ? 'red' : 'transparent'} strokeWidth="3" />
                <image
                  xlinkHref={piece.imgSrc}
                  x={piece.imgPosition.left}
                  y={piece.imgPosition.top}
                  transform={`translate(${offsetX}, ${offsetY})`}
                />
              </g>
            );
          })}
          {/* {
            isActive && (
              <Fragment>
                左垂直線
                <line x1={baseLeftItemInfo.left} x2={baseLeftItemInfo.left} y1={0} y2={3000} stroke="black" strokeDasharray="10" />
                右垂直線
                <line x1={puzzleData.left + PuzzleWidthInPx} x2={puzzleData.left + PuzzleWidthInPx} y1={0} y2={3000} stroke="black" strokeDasharray="10" />
                上水平線
                <line x1={0} x2={3000} y1={baseLeftItemInfo.top} y2={baseLeftItemInfo.top} stroke="black" strokeDasharray="10" />
                下水平線
                <line x1={0} x2={3000} y1={puzzleData.top + PuzzleHeightInPx} y2={puzzleData.top + PuzzleHeightInPx} stroke="black" strokeDasharray="10" />
              </Fragment>
            )
          } */}
        </g>
      </Draggable>
    </Fragment>
  );
}

export default CombinedPuzzlePieceSvg;
