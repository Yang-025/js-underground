import styled from 'styled-components';

const StyledSlider = styled.div`
  height: 100%;
  .slider__box {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100%;
  }

  div[class^="slider__item"] {
    position: absolute;
    /* 每個item移動都帶有動畫 */
    transition: all 0.4s ease-in-out;
  }

  /* 前面 */
  .slider__item__main {
    /* z-index要最大 */
    z-index: 4;
    transform: translate3d(0, 0, 0);
  }

  /* 左 */
  .slider__item__left {
    z-index: 3;
    box-shadow: 0px 4px 40px #ffffff80;
    transform: translate3d(-50%, 0, -250px) scale(0.8); 
  }

  /* 右 */
  .slider__item__right {
    z-index: 3;
    box-shadow: 0px 4px 40px #ffffff80;
    transform: translate3d(50%, 0, -250px) scale(0.8); 
  }

  /* 後面 */
  .slider__item__bak {
    transform: scale(0.5);
    opacity: 0.5;
  }

  /* ********** 畫布 ********** */
  canvas {
    position: absolute;
  }
  /* ********** 畫布 ********** */
`;

export default StyledSlider;
