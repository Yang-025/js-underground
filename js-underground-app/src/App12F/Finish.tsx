import React from 'react';
// import FinishImg from './assets/img-Qingming.png';
import { PuzzleItem, CombinedList } from './interface';
import PuzzlePieceSvg from './PuzzlePieceSvg';
import styled from 'styled-components';
import * as R from 'ramda';

const StyledFinish = styled.div`
  position: absolute;
  left: ${(props: { left: number, top: number }) => props.left + 'px'};
  top: ${(props: { left: number, top: number }) => props.top + 'px'};
  display: flex;
  width: 540px;
  height: 540px;
  flex-wrap: wrap;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  box-shadow: rgb(255, 255, 255) 0px 0px 30px 0px;
  outline: 1px solid #fff;
  .puzzle {
    width: 180px;
    height: 180px;
    position: relative;
    img {
      position: absolute;
    }
  }
`;

interface IProps {
  puzzleList: PuzzleItem[];

}

const Finish: React.FC<IProps> = (props) => {
  const { puzzleList } = props;
  return (
    <StyledFinish left={puzzleList[0].left} top={puzzleList[0].top}>
      {R.sortBy(R.prop('id'), puzzleList).map(item => {
        return (
          <div className="puzzle">
            <img style={{ ...item.imgPosition }} src={item.imgSrc} alt="" />
          </div>
        );
      })}
    </StyledFinish>
  );
}

export default Finish;
