import React, { useState } from 'react';
import * as R from 'ramda';
import PuzzlePieceSvg from './PuzzlePieceSvg';
import CombinedPuzzlePieceSvg from './CombinedPuzzlePieceSvg';
import { PuzzleItem, CombinedList } from './interface';
import * as Utils from './utils';
import { shufflePuzzleList } from './puzzleSetting';

import styled from 'styled-components';


const StyledSvg = styled.svg`
    width: 100%;
    height: calc(100% - 300px);
    stroke: red;
`;



interface IProps {
  isMoving:boolean;
  puzzleList: PuzzleItem[];
  combinedList:CombinedList[];
  activePuzzleId:number| string;
  highlightList:number[];
  handleDrag: (id: number, x: number, y: number) => void;
  handleDragStop: () => void;
  handleCombinedDrag: (someUpdatedPuzzles: PuzzleItem[], id: string) => void;
  handleCombinedDragStop: () => void;
}

const Demo: React.FC<IProps> = (props) => {
  const {combinedList,puzzleList, highlightList, activePuzzleId, 
    handleCombinedDrag, handleCombinedDragStop, handleDrag, handleDragStop} = props;
  return (
    <StyledSvg>
      {
        combinedList.map((items) => {
          return (
            <CombinedPuzzlePieceSvg
              key={items.id}
              id={items.id}
              combinedPointList={items.pieces}
              data={puzzleList.filter(x => {
                return items.pieces.includes(x.id);
              })}
              highlight={R.intersection(highlightList, items.pieces).length > 0}
              handleDrag={handleCombinedDrag}
              handleDragStop={() => {
                handleCombinedDragStop();
              }}
              isActive={items.id === activePuzzleId}
            />
          )
        })
      }
      {puzzleList.filter(i => !combinedList.find(j => j.pieces.includes(i.id))).map(item => {
        return (
          <PuzzlePieceSvg
            handleDrag={handleDrag}
            handleDragStop={handleDragStop}
            data={item}
            key={item.id}
            highlight={highlightList.includes(item.id)}
            isActive={item.id === activePuzzleId}
          />
        )
      })}
    </StyledSvg>
  );
}

export default Demo;
