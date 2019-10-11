import React from 'react';

import Slider from './Slider';
// import Demo from './Demo4';
import './index.scss';


const APP15F: React.FC = () => {
  return (
    <div className="wrapper">
      {/* <Demo /> */}
      <div className="title__section">
        <span>Disintegration Note</span>
      </div>
      <div className="slider__section">
        <Slider />
      </div>
      <div className="note__section">
        <div className="note">
          <span className="note__title">— Write Down the Name to Disintegrate it —</span>
          <div className="note__text_box">
            <input className="note__text_box__input" type="text" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default APP15F;
