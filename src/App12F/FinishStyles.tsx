import styled, { keyframes, css } from 'styled-components';


const blink = keyframes`
  from {
    border: 1px solid #fff;
  }
  to {
    border: 1px solid transparent;
    transform: scale(1.05);
  }
`;

const shadowGrow = keyframes`
  from {
    box-shadow: 0px 0px 20px 0px #fff;
  }
  to {
    box-shadow: 0px 0px 10px 0px #fff;
  }
`;

interface IStyledFinish {
  left: number;
  top: number;
  effect: boolean;
}


const StyledFinish = styled.div`
  position: absolute;
  left: ${(props: IStyledFinish) => `${props.left}px`};
  top: ${(props: IStyledFinish) => `${props.top}px`};
  transition: all 1s ease-in-out;
  display: flex;
  width: 540px;
  height: 540px;
  flex-wrap: wrap;
  box-shadow: rgb(255, 255, 255) 0px 0px 30px 0px;
  outline: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 1px #fff;
  animation: ${(props: IStyledFinish) => props.effect ? css`${shadowGrow} 0.8s ease infinite alternate` : 'none'};

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(1.02);
    border: 1px solid #fff;
    opacity: ${(props: IStyledFinish) => props.effect ? 0.6 : 0};
    animation: ${(props: IStyledFinish) => props.effect ? css`${blink} 1s ease infinite` : 'none'};
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(1.05);
    border: 1px solid #fff;
    opacity: ${(props: IStyledFinish) => props.effect ? 0.4 : 0};
    animation: ${(props: IStyledFinish) => props.effect ? css`${blink} 1s ease infinite` : 'none'};
  }

  .puzzle {
    width: 180px;
    height: 180px;
    position: relative;
    img {
      position: absolute;
    }
  }
`;

const StyledDesc = styled.div`
  position: absolute;
  left: calc(50% - 175px);
  top: calc(50% - 270px);
  z-index: 1;
  visibility: hidden;
  width: 350px;
  height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .desc {
    &__h1 {
      font-weight: bold;
      font-size: 36px;
      line-height: 51px;
    }
    
    &__text {
      text-align: left;
      font-size: 16px;
      line-height: 23px;
      &.bold {
      font-weight: bold;
      }
    }
    
    &__btn {
      /* reset button style */
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      /* reset button style */
      background-color: #fff;
      color: black;
      width: 350px;
      height: 67px;
      font-size: 24px;
      line-height: 35px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;


export { StyledFinish, StyledDesc };
