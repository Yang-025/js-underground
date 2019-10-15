import React, { useState } from 'react';

import './Demo.scss';



const Demo: React.FC = () => {
  const [mainPhotoIndex, setmainPhotoIndex] = useState(0);
  let photoList = ['aa', 'bb', 'cc', 'dd', 'ee'];

  const getPosition = (photoIndex: number) => {
    // 剩最後一張，就放中間
    if (photoList.length === 1) {
      return 'main'
    }
    // 第一張在中間的話
    if (mainPhotoIndex === 0 && photoList.length >= 3) {
      // 它的左邊是陣列的最後一張
      if (photoIndex === photoList.length - 1) {
        return 'left';
      }
    }
    // 最後一張在中間的話
    if (mainPhotoIndex === photoList.length - 1 && photoList.length >= 3) {
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
  
  const handlePrev = () => {
    // 已經是第一個了，就回到最後一個
    if (mainPhotoIndex === 0) {
      setmainPhotoIndex(photoList.length - 1);
    } else {
      setmainPhotoIndex(mainPhotoIndex - 1);
    }
  }
  const handleNext = () => {
    // 已經是最後一個了，就回到第一個
    if (mainPhotoIndex === photoList.length - 1) {
      setmainPhotoIndex(0);
    } else {
      setmainPhotoIndex(mainPhotoIndex + 1);
    }
  }

  return (
    <div className="demo">
      <div className="slider">
        {photoList.map((x, index) => {
          return (
            <div className={`photo${index + 1} ${getPosition(index)}`}>{x}</div>
          )
        })}
      </div>
      <button className="prev" onClick={handlePrev}>往前</button>
      <button className="next" onClick={handleNext}>往後</button>
    </div>
  );
}

export default Demo;
