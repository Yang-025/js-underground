import React from 'react';

import Slider from './Slider';
// import Demo from './Demo4';
import './index.scss';
import ImgApathetic from './assets/apathetic.jpg';
import ImgDepression from './assets/depression.jpg';
import ImgGuilty from './assets/guilty.jpg';
import ImgHelpless from './assets/helpless.jpg';
import ImgInsecure from './assets/insecure.jpg';

const APP15F: React.FC = () => {
  let photoList = [
    { src: ImgApathetic, name: 'Apathetic' },
    { src: ImgDepression, name: 'Depression' },
    { src: ImgGuilty, name: 'Guilty' },
    { src: ImgHelpless, name: 'Helpless' },
    { src: ImgInsecure, name: 'Insecure' }
  ];
  return (
    <div className="wrapper">
      {/* <Demo /> */}
      <div className="title__section">
        <span>Disintegration Note</span>
      </div>
      <div className="slider__section">
        <Slider photoList={photoList} />
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
