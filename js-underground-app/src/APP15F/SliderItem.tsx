import React, { useState, Fragment, useRef, useEffect, RefObject } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import StyledSlider from './SliderStyle';
import * as Utils from './utils';



interface Props {
  photoItem: { src: string, name: string },
  index: number,
  handlePrev: () => void,
  handleNext: () => void,
  onDisappearComplete: () => void,
  getPosition: (index: number) => string,
  disappearName: string | null,
  parentRef: RefObject<HTMLDivElement>
}

const SliderItem: React.FC<Props> = ({ onDisappearComplete, parentRef, disappearName, index, photoItem, getPosition, handlePrev, handleNext }) => {
  const wrapperEl: RefObject<HTMLDivElement> = useRef(null);


  async function prepareScene() {
    if (!parentRef.current) {
      return;
    }
    if (!wrapperEl.current) {
      return;
    }
    if (disappearName !== photoItem.name) {
      return;
    }
    // 要分幾層。每層分配不同的像素來達到粒子化的效果
    const layerCount = 30;

    const canvas = await html2canvas(wrapperEl.current, {
      scale: 1
    });
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    console.log('canvas', canvas);
    console.log('imgWidth', imgWidth);
    console.log('imgHeight', imgHeight);

    // 2.再透過getImageData取得ImageData Instance
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    // 3. 把一張圖片分到n層去，隨機的取樣，做粒子化
    let samplerLayersList = Utils.sampler(imageData, imgWidth, imgHeight, layerCount)

    // 4. 把粒子化的特效畫到canvas上
    const updatedCanvasList = Utils.appendLayersWithParticleEffect(samplerLayersList, imgWidth, imgHeight, parentRef.current);
    // 原本的div消失，換上n層canvas
    wrapperEl.current.style.opacity = '0';
    // 每一層的canvas加上不同動畫效果，執行下去

    updatedCanvasList.forEach((c: HTMLCanvasElement, index: number) => {
      setTimeout(() => {
        const rotate1 = 15 * (Math.random() - 0.5);
        const rotate2 = 15 * (Math.random() - 0.5);
        const fac = 2 * Math.PI * (Math.random() - 0.5);
        const translateX = 60 * Math.cos(fac);
        const translateY = 30 * Math.sin(fac);

        c.style.transform = `rotate(${rotate1}deg) translate(${translateX}px, ${translateY}px) rotate(${rotate2}deg)`;
        c.style.opacity = '0';
        const removeDelay = 1e3 * (1.5 + 1 + Math.random());
        setTimeout(() => c.remove(), removeDelay);
        if (index === updatedCanvasList.length - 1) {
          console.log('做完了', index);
          onDisappearComplete();

        }
      }, 70 * index);
    });
  }


  useEffect(() => {
    if (!disappearName) {
      // if (wrapperEl.current) {
      //   wrapperEl.current.style.opacity = '1';
      // }
      // return;
    }
    prepareScene();
    console.log('處理')
  }, [disappearName]);

  return (
    <div ref={wrapperEl} className={`slider__item__${getPosition(index)}`}>
      <div className="slider__photo">
        <img src={photoItem.src} alt="" />
      </div>
      <div style={{ display: getPosition(index) === 'main' ? 'block' : 'none' }}>
        <span>{photoItem.name}</span>
      </div>
      <button className="slider__arrow" style={{ opacity: getPosition(index) === 'main' ? 1 : 0 }}>
        <FaAngleLeft size={48} onClick={handlePrev} />
      </button>
      <button className="slider__arrow" style={{ opacity: getPosition(index) === 'main' ? 1 : 0 }}>
        <FaAngleRight size={48} onClick={handleNext} />
      </button>
    </div>
  );
}

export default SliderItem;
