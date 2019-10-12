import React, { useState, Fragment } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import StyledSlider from './SliderStyle';

interface Props {
  photoList: Array<{ src: string, name: string }>,
  handlePrev: () => void,
  handleNext: () => void,
  mainPhotoIndex: number
}

const Slider: React.FC<Props> = ({ photoList, mainPhotoIndex, handlePrev, handleNext }) => {
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
      <div className="slider__box">
        {photoList.map((photoItem, index) => {
          return (
            <div className={`slider__item__${getPosition(index)}`}>
              <div className="slider__photo">
                <img src={photoItem.src} alt="" />
              </div>
              <span style={{ display: getPosition(index) === 'main' ? 'block' : 'none' }}>{photoItem.name}</span>
              <button className="slider__arrow" style={{ opacity: getPosition(index) === 'main' ? 1 : 0 }}>
                <FaAngleLeft size={48} onClick={handlePrev} />
              </button>
              <button className="slider__arrow" style={{ opacity: getPosition(index) === 'main' ? 1 : 0 }}>
                <FaAngleRight size={48} onClick={handleNext} />
              </button>
            </div>
          )
        })}
      </div>
    </StyledSlider>

  );
}

export default Slider;
