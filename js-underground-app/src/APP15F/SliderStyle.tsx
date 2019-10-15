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
    border: 10px solid #FFFFFF;
    background-color: #fff;
  }

  /* 左右 */
  .slider__item__left, .slider__item__right {
    z-index: 3;
    box-shadow: 0px 4px 40px #ffffff80;
  }

  .slider__item__left {
    transform: translate3d(-50%, 0, -250px) scale(0.8); 
  }

  .slider__item__right {
    transform: translate3d(50%, 0, -250px) scale(0.8); 
  }

  /* 後面 */
  .slider__item__bak {
    transform: scale(0.5);
    opacity: 0.5;
  }
  
  /* ********** 左右箭頭按鈕 ********** */
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
  /* ********** 左右箭頭按鈕 ********** */


  /* ********** 畫布 ********** */
  canvas {
    position: absolute;
  }
  /* ********** 畫布 ********** */
`;


// 輪播牆的照片
const StyledSliderPhoto = styled.div`
  width: 540px;
  height: 336px;
  background-size: cover;
  background-position: center center;
  background-image: ${(props: { src: string }) => `url(${props.src})`};
`;

// 輪播牆的照片名稱
const StyledSliderPhotoName = styled.span`
  text-transform: capitalize;
  font-family: "Homemade Apple";
  font-size: 24px;
  line-height: 60px;
`;


export {
  StyledSliderPhoto,
  StyledSliderPhotoName,
};


export default StyledSlider;
