import styled from 'styled-components';
import { ELineDirection } from './interface';

const StyledPuzzlePiece = styled.div`
  /* left: ${(props: { top?: number, left?: number, highlight: boolean }) => `${props.left}px` || '0px'}; */
  /* top: ${(props: { top?: number, left?: number, highlight: boolean }) => `${props.top}px` || '0px'}; */
  position: relative;
  background-color: red;
  width: 180px;
  height: 180px;
  /* 不加的話，父層的div下方會有空白 */
  > img {
    width: fit-content;
    height: fit-content;
    position: absolute;
  }
  box-shadow: ${(props: { top?: number, left?: number, highlight: boolean }) => props.highlight ? '0px 0px 30px #FFFFFF' : 'none'};
`;



interface IStyledLine {
  top?: number
  left?: number
  way: ELineDirection
}


const StyledLine = styled.div`
  position: absolute;
  left: ${(props: IStyledLine) => `${props.left}px` || '0px'};
  top: ${(props: IStyledLine) => `${props.top}px` || '0px'};
  height: ${(props: IStyledLine) => props.way === 'horizontal' ? '1px' : '100%'};
  width: ${(props: IStyledLine) => props.way === 'horizontal' ? '100%' : '1px'};
  background: red;
`;

export { StyledPuzzlePiece, StyledLine };
