import React, { Fragment } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import StyledSliderItem, { StyledSliderPhoto, StyledSliderPhotoName } from './SliderItemStyle';




interface Props {
  photoItem: { src: string, name: string },
  handlePrev: () => void,
  handleNext: () => void,
  position: string
}

const SliderItem: React.FC<Props> = (props) => {
  const { photoItem, handlePrev, handleNext, position } = props;

  return (
    <StyledSliderItem>
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
