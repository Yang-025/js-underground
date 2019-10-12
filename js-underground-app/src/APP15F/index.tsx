import React, { useRef, useState } from 'react';

import Slider from './Slider';
// import Demo from './Demo4';
import './index.scss';
import ImgApathetic from './assets/apathetic.jpg';
import ImgDepression from './assets/depression.jpg';
import ImgGuilty from './assets/guilty.jpg';
import ImgHelpless from './assets/helpless.jpg';
import ImgInsecure from './assets/insecure.jpg';

const APP15F: React.FC = () => {
  const inputEl = useRef(null);
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [photoList, setPhotoList] = useState([
    { src: ImgApathetic, name: 'apathetic' },
    { src: ImgDepression, name: 'depression' },
    { src: ImgGuilty, name: 'guilty' },
    { src: ImgHelpless, name: 'helpless' },
    { src: ImgInsecure, name: 'insecure' }
  ]);
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    let element = event.target as HTMLInputElement;
    let value = element.value;
    if (event.key === 'Enter') {
      // alert(value);
      // 做完一些效果
      // 把相片刪除
      const lowercaseInput = value.toLowerCase();
      // 有輸入照片的名字就要處理
      let regex = new RegExp(`${photoList.map(x => x.name).join('|')}`, 'g');
      // const newPhotoList = photoList.filter(x => x.name !== lowercaseInput);
      // 需要處理的照片有
      let matchList = lowercaseInput.match(regex);

      if (matchList) {
        matchList.forEach((name, index) => {
          // 找到這個item在輪播牆的index
          const photoIndex = photoList.map(x => x.name).indexOf(name);
          console.log(name, photoIndex);
          // 慢慢地移過去
          let dd = photoIndex - mainPhotoIndex;
          if (dd > 0) {
            for (let i = 0; i < dd; i++) {
              setTimeout(() => { handleNext() }, i * 1000)
            }
            setTimeout(() => { console.log('Thonas') }, dd * 1000 + 300)
          } else {
            for (let i = 0; i < Math.abs(dd); i++) {
              setTimeout(() => { handlePrev() }, i * 1000)
            }
            setTimeout(() => { console.log('Thonas') }, dd * 1000 + 300)
          }
          // // 做canvas效果
          // // 把圖片從photoList移除
          // setPhotoList(photoList.filter(x => x.name !== name));
          // // 把photoIndex歸0
          // setMainPhotoIndex(0);
        })
      }
    }
  }

  const handleDisappear = () => {

  }

  const handlePrev = () => {
    // 已經是第一個了，就回到最後一個
    if (mainPhotoIndex === 0) {
      setMainPhotoIndex(photoList.length - 1);
    } else {
      setMainPhotoIndex(prevState => prevState - 1);
    }
  }
  const handleNext = () => {
    // 已經是最後一個了，就回到第一個
    if (mainPhotoIndex === photoList.length - 1) {
      setMainPhotoIndex(0);
    } else {
      setMainPhotoIndex(prevState => prevState + 1);
    }
  }

  return (
    <div className="wrapper">
      {/* <Demo /> */}
      <div className="title__section">
        <span>Disintegration Note</span>
      </div>
      <div className="slider__section">
        <Slider
          photoList={photoList}
          mainPhotoIndex={mainPhotoIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          // handleDisappear={handleDisappear}
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
