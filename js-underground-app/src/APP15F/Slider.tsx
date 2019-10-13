import React, { useState, Fragment, useRef, RefObject } from 'react';

import StyledSlider from './SliderStyle';
import SliderItem from './SliderItem';

interface Props {
  photoList: Array<{ src: string, name: string }>,
  handlePrev: () => void,
  handleNext: () => void,
  mainPhotoIndex: number,
  disappearName: string | null
}

const Slider: React.FC<Props> = ({ photoList, mainPhotoIndex, handlePrev, handleNext, disappearName }) => {
  const sliderBoxEl: RefObject<HTMLDivElement> = useRef(null);
  const getPosition = (photoIndex: number) => {
    // 剩最後一張，就放中間
    if (photoList.length === 1) {
      return 'main'
    }
    // 第一張在中間的話
    if (mainPhotoIndex === 0) {
      // 它的左邊是陣列的最後一張
      if (photoIndex === photoList.length - 1) {
        return 'left';
      }
    }
    // 最後一張在中間的話
    if (mainPhotoIndex === photoList.length - 1) {
      // 它的右邊是陣列的第一張
      if (photoIndex === 0) {
        return 'right';
      }
    }

    if (photoIndex === mainPhotoIndex - 1) {
      return 'left';
    }
    if (photoIndex === mainPhotoIndex + 1) {
      return 'right';
    }
    if (photoIndex === mainPhotoIndex) {
      return 'main';
    }
    return 'bak'
  }

  return (
    <StyledSlider className="slider">
      <div className="slider__box" ref={sliderBoxEl}>
        {photoList.map((photoItem, index) => {
          return (
            <SliderItem
              photoItem={photoItem}
              index={index}
              handlePrev={handlePrev}
              handleNext={handleNext}
              getPosition={getPosition}
              disappearName={disappearName}
              parentRef={sliderBoxEl}
            />
          )
        })}
      </div>
    </StyledSlider>

  );
}

export default Slider;
