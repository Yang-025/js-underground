import styled from 'styled-components';

const StyledSlider = styled.div`
  height: 100%;
  .slider__box {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100%;
  }


  .slider__photo {
    width: 540px;
    height: 336px;
    > img {
      width: inherit;
      height: inherit;
      /* object-fit: cover; */
    }
  }

  div[class^="slider__item"] {
    position: absolute;
    /* 動畫效果 */
    transition: all 0.4s ease-in-out;
    /* transition: transform 0.4s ease-in-out; */
  }

  .slider__item {
    /* 前面的照片 */
    &__main {
      /* z-index要最大 */
      z-index: 4;
      transform: translate3d(0, 0, 0);
      border: 10px solid #FFFFFF;
      background-color: #fff;

      .slider__photo_name {
        text-transform: capitalize;
        font-family: "Homemade Apple";
        font-size: 24px;
        line-height: 60px;
      }
    }

    &__left, &__right {
      z-index: 3;
      box-shadow: 0px 4px 40px #ffffff80;
    }

    /* 左邊的效果 */
    &__left {
      /* transform: translate(-50%, 0) scale(.75); */
      transform: translate3d(-50%, 0, -250px) scale(0.8); 
    }

    /* 右邊的效果 */
    &__right {
      /* transform: translate(50%, 0) scale(.75); */
      transform: translate3d(50%, 0, -250px) scale(0.8);
    }

    /* 藏在後面的照片 */
    &__bak {
      transform: scale(0.5);
      opacity: 0.5;
    }
  }



  /* 左右箭頭按鈕 */
  .slider__arrow {
    outline: none;
    color: #fff;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    &:hover {
      transform: scale(1.5);
    }
    &:nth-of-type(1) {
      left: -70px;
      top: 50%;
    }
    &:nth-of-type(2) {
      right: -70px;
      top: 50%;
    }
  }


  canvas {
    position: absolute;
  }
`;



export default StyledSlider;
