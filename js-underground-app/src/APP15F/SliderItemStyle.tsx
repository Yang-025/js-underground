import styled from 'styled-components';


const StyledSliderItem = styled.div`
  background-color: #fff;
  
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

export default StyledSliderItem;
