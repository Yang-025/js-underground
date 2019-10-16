import React, { useRef, useState } from 'react';

import Slider from './Slider';
// import Demo from './Demo4';
import './index.scss';
import ImgApathetic from './assets/apathetic.jpg';
import ImgDepression from './assets/depression.jpg';
import ImgGuilty from './assets/guilty.jpg';
import ImgHelpless from './assets/helpless.jpg';
import ImgInsecure from './assets/insecure.jpg';


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
  const [disappearList, setDisappearList] = useState<any[]>([]);
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [photoList, setPhotoList] = useState([
    { src: ImgApathetic, name: 'apathetic' },
    { src: ImgDepression, name: 'depression' },
    { src: ImgGuilty, name: 'guilty' },
    { src: ImgHelpless, name: 'helpless' },
    { src: ImgInsecure, name: 'insecure' }
  ]);

  async function onDisappearComplete() {
    if (disappearList.length < 0) {
      return;
    }
    console.log('我結束了')
    // 把圖片從photoList移除
    let updatePhotoList = photoList.filter(x => x.name !== disappearList[0])
    if (updatePhotoList.length > 0) {
      // 方法一： 移動陣列
      let updatePhotoList2 = circularSortArray(updatePhotoList);
      setPhotoList(updatePhotoList2[mainPhotoIndex % updatePhotoList2.length]);
      setMainPhotoIndex(0);
      setDisappearList(disappearList.slice(1));

      // 方法二： 不移動陣列，設定index
      // setPhotoList(updatePhotoList);
      // setMainPhotoIndex(updatePhotoList.length === mainPhotoIndex ? 0 : mainPhotoIndex);
      // setDisappearList(disappearList.slice(1));
    }
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
