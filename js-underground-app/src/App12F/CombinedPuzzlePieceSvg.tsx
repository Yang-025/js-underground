import React, { Fragment, useRef, RefObject, useEffect, useState } from 'react';
// import Draggable from './Draggable';
import Draggable, { DraggableCore } from "react-draggable";
import * as R from "ramda";


import { PuzzleItem, ELineDirection } from './interface';
import { StyledPuzzlePiece, StyledLine } from './Styles';
import { PuzzleWidthInPx, PuzzleHeightInPx } from './puzzleSetting';


interface IProps {
  data: PuzzleItem[],
  combinedPointList: number[][],
  handleDrag: (id: number, left: number, top: number) => void
  handleDragStop: () => void
}


function findLeftTopBaseItem(combinedPointList: number[][]) {
  // 找到最左上角的項目
  const baseLeftItem = combinedPointList.reduce((prev: number[] | null, curr: number[]) => {
    if (prev === null) {
      return curr;
    }
    const [prevX, prevY] = prev;
    const [currX, currY] = curr;
    // TODO 這裡應該有更好的判斷
    // 如果x,y都小，那就是最小
    if (prevX < currX && prevY < currY) {
      return prev;
    }
    // 如果x軸一樣，y小的為最小
    if (prevX === currX && prevY < currY) {
      return prev;
    }
    // 如果y軸一樣，x小的為最小
    if (prevY === currY && prevX < currX) {
      return prev;
    }
    return curr;
  }, null);
  return baseLeftItem;

}


const CombinedPuzzlePieceSvg: React.FC<IProps> = (props) => {
  const { data, combinedPointList, handleDrag, handleDragStop } = props;

  console.log('combinedPointList', combinedPointList);
  // 找到最左上角的項目，以此項目作為參考點計算座標
  const baseLeftItem = findLeftTopBaseItem(combinedPointList);
  const position = data.find(item => R.equals(item.coordinate, baseLeftItem));
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
          console.log('drag', data);
          // handleDrag(id, data.x, data.y);
        }}
        onStop={handleDragStop}
        // x最小，y最小的位置為準
        position={{ x: position.left, y: position.top }}
      >
        <g>
          {data.map((piece) => {
            return (
              <image xlinkHref={piece.imgSrc} x={piece.imgPosition.left} y={piece.imgPosition.top} transform={`translate(${piece.left}, ${piece.top})`} />
            );
          })}
        </g>
      </Draggable>
    </Fragment>
  );
}

export default CombinedPuzzlePieceSvg;
