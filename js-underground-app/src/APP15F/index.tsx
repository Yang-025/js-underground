import React, { useRef, useState, useEffect } from 'react';

import Slider from './Slider';
// import Demo from './Demo4';
import './index.scss';
import ImgApathetic from './assets/apathetic.jpg';
import ImgDepression from './assets/depression.jpg';
import ImgGuilty from './assets/guilty.jpg';
import ImgHelpless from './assets/helpless.jpg';
import ImgInsecure from './assets/insecure.jpg';
import * as Utils from './utils';

function circularSortArray(arr: any[]): any[] {
  return arr.map((item, index) => {
    let dd = arr.map((innerItem, innerIndex) => {
      return arr[(index + innerIndex) % arr.length]
    })
    return dd
  })
}


const APP15F: React.FC = () => {
  const inputEl = useRef(null);
  const [disappearName, setDisappearName] = useState<string | null>(null);
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [photoList, setPhotoList] = useState([
    { src: ImgApathetic, name: 'apathetic' },
    { src: ImgDepression, name: 'depression' },
    { src: ImgGuilty, name: 'guilty' },
    { src: ImgHelpless, name: 'helpless' },
    { src: ImgInsecure, name: 'insecure' }
  ]);

  async function onDisappearComplete() {
    console.log('我結束了')
    // 把圖片從photoList移除
    let updatePhotoList = photoList.filter(x => x.name !== disappearName)
    if (updatePhotoList.length > 0) {



      // 移動陣列
      // let updatePhotoList2 = circularSortArray(updatePhotoList);
      // console.log(`mainPhotoIndex is ${mainPhotoIndex}, pp ${mainPhotoIndex % updatePhotoList2.length}`);
      // console.log('updatePhotoList2', updatePhotoList2);
      // setPhotoList(updatePhotoList2[mainPhotoIndex % updatePhotoList2.length]);
      // setMainPhotoIndex(0);
      // setDisappearName(null);

      // 不移動陣列，設定index
      setPhotoList(updatePhotoList);
      setMainPhotoIndex(updatePhotoList.length === mainPhotoIndex ? 0 : mainPhotoIndex);
      setDisappearName(null);
      
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    let element = event.target as HTMLInputElement;
    let value = element.value;
    if (event.key === 'Enter') {
      const lowercaseInput = value.toLowerCase();
      // 有輸入照片的名字就要處理
      let regex = new RegExp(`${photoList.map(x => x.name).join('|')}`, 'g');

      // 需要處理的照片有
      let matchList = lowercaseInput.match(regex);

      if (matchList) {
        matchList.forEach(async (name, index) => {
          // 找到這個item在輪播牆的index
          const photoIndex = photoList.map(x => x.name).indexOf(name);
          console.log(name, photoIndex);
          // 慢慢地移過去
          let dd = photoIndex - mainPhotoIndex;

          for (let i = 0; i < Math.abs(dd); i++) {
            await Utils.delay(500);
            if (dd > 0) {
              handleNext();
            } else {
              handlePrev();
            }
          }
          await Utils.delay(500);
          setDisappearName(name);
        })
      }
    }
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
          disappearName={disappearName}
          onDisappearComplete={onDisappearComplete}
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
