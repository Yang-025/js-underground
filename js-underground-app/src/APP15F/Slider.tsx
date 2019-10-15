import React, { useState, Fragment, useRef, RefObject } from 'react';
import StyledSlider from './SliderStyle';
import SliderItem from './SliderItem';
import * as Utils from './utils';

interface Props {
  photoList: Array<{ src: string, name: string }>,
  handlePrev: () => void,
  handleNext: () => void,
  onDisappearComplete: () => void,
  mainPhotoIndex: number,
  disappearName: string | null
}

const Slider: React.FC<Props> = ({ onDisappearComplete, photoList, mainPhotoIndex, handlePrev, handleNext, disappearName }) => {
  const sliderBoxEl: RefObject<HTMLDivElement> = useRef(null);
  return (
    <StyledSlider className="slider">
      <div className="slider__box" ref={sliderBoxEl}>
        {photoList.map((photoItem, index) => {
          const position = Utils.getPosition(index, mainPhotoIndex, photoList.length);
          return (
            <div className={`slider__item__${position}`}>
              <SliderItem
                key={`${photoItem.src}_${index}`}
                // key={index}
                photoItem={photoItem}
                handlePrev={handlePrev}
                handleNext={handleNext}
                position={position}
                disappearName={disappearName}
                parentRef={sliderBoxEl}
                onDisappearComplete={onDisappearComplete}
              />
            </div>
          )
        })}
      </div>
    </StyledSlider>

  );
}

export default Slider;
