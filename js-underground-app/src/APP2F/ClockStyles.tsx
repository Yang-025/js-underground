import styled from 'styled-components';
import { ReactComponent as ClockFaceSvg } from './assets/clock-bg.svg';

/* 輔助線 */
const auxiliaryLine = (size: number = 1, color: string = 'red') => {
  return `
  border: ${size}px solid ${color};
  `;
}


/* 輔助 transform-origin的點 */
const auxiliaryPoint = (transformOriginX: string = '0', transformOriginY: string = '0', backgroundColor: string = '#f0f') => {
  return `
  &:after {
    position: absolute;
    left: ${transformOriginX};
    top: ${transformOriginY};
    width: 5px;
    height: 5px;
    content: '';
    background-color: ${backgroundColor};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;
}



const StyledClock = styled.div`
  background-color: #293B29;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .clock-section {
    position: relative;
    width: 500px;
    height: 500px;

    /* 水平垂直輔助線 */
    /* &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    }

    &:before {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    } */
    /* 水平垂直輔助線 END */
  }

  /* 輔助測試轉一圈的效果 */
  /* &:hover {
    .hour-hand {
      transform: rotate(360deg);
      transition: all 3s;
    }

    .minute-hand {
      transform: rotate(360deg);
      transition: all 0.5s;
    }

    .second-hand {
      transform: rotate(360deg);
      transition: all 0.5s;
    }
  } */
  /* 輔助測試轉一圈的效果 END */

`;


const StyledClockFace = styled(ClockFaceSvg)`
  position: absolute;
  left: 0;
  top: 0;
`;


const StyledHour = styled.div` 
  position: absolute;
  z-index: 1;
  left: 245px;
  top: 243px;
  transform-origin: 5px 50%;
  transform: ${(props: { degree: number }) => `rotate(${props.degree}deg)`};

  /* 把多餘空白移除 */
  display: flex;

  /* 輔助 */
  /* ${auxiliaryLine(1, 'yellow')} */
  /* ${auxiliaryPoint('5px', '50%', '#f0f')} */
`;

const StyledMinute = styled.div` 
  position: absolute;
  z-index: 2;
  top: 154px;
  left: 246px;
  transform-origin: 50% 97%;
  transform: ${(props: { degree: number }) => `rotate(${props.degree}deg)`};

  /* 把多餘空白移除 */
  display: flex;

  /* 輔助 */
  /* ${auxiliaryLine(1, 'yellow')} */
  /* ${auxiliaryPoint('50%', '97%', 'yellow')} */
`;

const StyledSecond = styled.div` 
  position: absolute;
  z-index: 3;
  top: 244px;
  left: 242px;

  transform-origin: 50% 5px;
  transform: ${(props: { degree: number }) => `rotate(${props.degree}deg)`};

  /* 把多餘空白移除 */
  display: flex;

  /* 輔助 */
  /* ${auxiliaryLine(1, 'red')} */
  /* ${auxiliaryPoint('50%', '5px', '#fff')} */
`;

export { StyledClockFace, StyledHour, StyledMinute, StyledSecond };

export default StyledClock
