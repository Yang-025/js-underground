import React, { useRef, useState, RefObject } from 'react';

import Slider from './Slider';
// import Demo from './Demo4';
import './index.scss';
import ImgApathetic from './assets/apathetic.jpg';
import ImgDepression from './assets/depression.jpg';
import ImgGuilty from './assets/guilty.jpg';
import ImgHelpless from './assets/helpless.jpg';
import ImgInsecure from './assets/insecure.jpg';



const APP15F: React.FC = () => {
  const defaultPhotoList = [
    { src: ImgApathetic, name: 'apathetic' },
    { src: ImgDepression, name: 'depression' },
    { src: ImgGuilty, name: 'guilty' },
    { src: ImgHelpless, name: 'helpless' },
    { src: ImgInsecure, name: 'insecure' }
  ];
  const inputEl: RefObject<HTMLInputElement> = useRef(null);
  const [disappearList, setDisappearList] = useState<any[]>([]);
  const [photoList, setPhotoList] = useState(defaultPhotoList);

  async function onDisappearComplete() {
    if (disappearList.length < 0) {
      return;
    }
    if (disappearList.length === 1) {
      if (inputEl.current) {
        inputEl.current.value = '';
      }
    }
    setDisappearList(disappearList.slice(1));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    let element = event.target as HTMLInputElement;
    let value = element.value;
    if (event.key === 'Enter') {
      const lowercaseInput = value.toLowerCase();
      // 有輸入照片的名字就要處理
      let regex = new RegExp(`${photoList.map(x => x.name).join('|')}`, 'g');
      // 可以處理多張照片
      let matchList: string[] | null = lowercaseInput.match(regex);
      if (matchList) {
        setDisappearList(matchList);
      }
    }
  }

  return (
    <div className="wrapper-15f">
      {/* <Demo /> */}
      <div className="title__section">
        <span>Disintegration Note</span>
      </div>
      <div className="slider__section">
        <Slider
          defaultPhotoList={defaultPhotoList}
          photoList={photoList}
          setPhotoList={setPhotoList}
          onDisappearComplete={onDisappearComplete}
          disappearList={disappearList}
        />
      </div>
      <div className="note__section">
        <div className="note">
          <span className="note__title">— Write Down the Name to Disintegrate it —</span>
          <div className="note__text_box">
            <input
              ref={inputEl}
              className="note__text_box__input"
              type="text"
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default APP15F;
