// unused
import React, { useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import Draggable, { DraggableCore } from "react-draggable";

interface IProps {
  id: number
  onDrag: (x: any) => any
  onDragEnd: () => any
  children: ReactNode
}

interface IDragInfo {
  isDragging: boolean,
  offsetX: number,
  offsetY: number,
  pointX: number,
  pointY: number,
  itemLeft: number,
  itemTop: number,
}

const DraggableWrapper: React.FC<IProps> = ({ children, id, onDrag, onDragEnd }) => {
  const [state, setState] = useState({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    itemLeft: 0,
    itemTop: 0,
  });


  const styles = useMemo(() => ({
    cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
    zIndex: state.isDragging ? 2 : 1,
    left: state.itemLeft,
    top: state.itemTop,
    position: "absolute" as 'absolute',
  }), [state.isDragging, state.itemLeft, state.itemTop]);
  console.log('state', state.isDragging);
  return (
    <Draggable>
      {children}
    </Draggable>
  );
}


export default DraggableWrapper;
