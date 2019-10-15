import React, { useState, Fragment, useRef, useEffect, RefObject } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import StyledSliderItem, { StyledSliderPhoto, StyledSliderPhotoName } from './SliderItemStyle';
import * as Utils from './utils';



interface Props {
  photoItem: { src: string, name: string },
  handlePrev: () => void,
  handleNext: () => void,
  position: string
}

const SliderItem: React.FC<Props> = (props) => {
  const { photoItem, handlePrev, handleNext, position } = props;
  const wrapperEl: RefObject<HTMLDivElement> = useRef(null);

  return (
    <StyledSliderItem ref={wrapperEl}>
      <StyledSliderPhoto src={photoItem.src} />
      {position === 'main' ?
        <Fragment>
          <StyledSliderPhotoName>{photoItem.name}</StyledSliderPhotoName>
          <button className="slider__arrow">
            <FaAngleLeft size={48} onClick={handlePrev} />
          </button>
          <button className="slider__arrow">
            <FaAngleRight size={48} onClick={handleNext} />
          </button>
        </Fragment> : null}
    </StyledSliderItem>
  );
}

export default SliderItem;
