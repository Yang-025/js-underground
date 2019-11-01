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
  combinedPointList: number[],
  handleDrag: (puzzleItems: PuzzleItem[]) => void
  handleDragStop: () => void
}


const CombinedPuzzlePieceSvg: React.FC<IProps> = (props) => {
  const { data: combinedData, combinedPointList, 
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
            handleDrag(updatedData);
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
                <image
                  xlinkHref={piece.imgSrc}
                  x={piece.imgPosition.left}
                  y={piece.imgPosition.top}
                  transform={`translate(${0}, ${0})`}
                />
              );
            }
            // 跟左上角比，算出相對位置
            const offsetX = (piece.coordinate[0] - baseLeftItemInfo.coordinate[0]) * PuzzleWidthInPx;
            const offsetY = (piece.coordinate[1] - baseLeftItemInfo.coordinate[1]) * PuzzleWidthInPx;
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
