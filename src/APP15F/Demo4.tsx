import React, { useRef, useEffect, useState } from 'react';


import './Demo4.scss';
import FruitImg from './assets/davies-designs-studio-MDZOGRtfuAg-unsplash.jpg';

import * as Utils from './utils';


function loadImageProcess(src: string, imgEl: HTMLImageElement){
  return new Promise((resolve, reject) => {
    // let img = new Image()
    let img = imgEl
    img.onload = () => resolve(img.height)
    img.onerror = reject
    img.src = src
  })
}


/* 蘋果消失動畫
https://codepen.io/cxc421/pen/xNqLJv?editors=0010
*/
const Demo3: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('restore');
  const [canvasList, setCanvasList] = useState<HTMLCanvasElement[]>([]);
  const wrapperEl = useRef<HTMLImageElement>(null);
  const imgEl = useRef<HTMLImageElement>(null);

  async function prepareScene() {
    if (!wrapperEl.current) {
      return;
    }
    if (!imgEl.current) {
      return;
    }

    const wrapper: HTMLElement = wrapperEl.current;
    const img: HTMLImageElement = imgEl.current;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    /* ********** 加載圖片，有兩張圖可以測試 ********** */
    // 1. 加載草莓圖片
    await loadImageProcess(FruitImg, img);
    // 2. 加載車車圖片
    // const carSrc = "data:image/gif;base64,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";
    // img.width = 61;
    // img.height = 68;
    // await loadImageProcess(carSrc, img);
    /* ********** 加載圖片 ********** */

    let imgWidth = img.width;
    let imgHeight = img.height;
    // canvas要跟圖片一樣大
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    // 要分幾層。每層分配不同的像素來達到粒子化的效果
    const layerCount = 30;

    // 1.把圖片畫到canvas上
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

    // 2.再透過getImageData取得ImageData Instance
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    // 3. 把一張圖片分到n層去，隨機的取樣，做粒子化
    let samplerLayersList = Utils.sampler(imageData, imgWidth, imgHeight, layerCount)

    // 4. 把粒子化的特效畫到canvas上
    const updatedCanvasList = Utils.appendLayersWithParticleEffect(samplerLayersList, imgWidth, imgHeight, wrapper);
    setCanvasList(updatedCanvasList);
  }

  
  useEffect(() => {
    if (currentStatus !== 'restore') {
      return;
    }
    prepareScene();
  }, [currentStatus]);

  function handleHidden() {
    // 每一層的canvas加上不同動畫效果，執行下去
    canvasList.forEach((c: HTMLCanvasElement, index: number) => {
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
      }, 70 * index);
    });
    setCurrentStatus('hide')
  }

  function handleRestore() {
    setCurrentStatus('restore')
  }




  return (
    <div className="wrapper" ref={wrapperEl}>
      <h4>Photo by Davies Designs Studio on Unsplash</h4>
      <img ref={imgEl} alt="" width={600} height={400} />
      <div className="container">
        <button className="start" onClick={handleHidden}>消失</button>
        <button className="start" onClick={handleRestore}>還原</button>
      </div>
    </div>
  );
}

export default Demo3;
