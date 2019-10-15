import React, { useState, Fragment, useRef, RefObject, useEffect } from 'react';
import html2canvas from 'html2canvas';
import StyledSlider from './SliderStyle';
import SliderItem from './SliderItem';
import * as Utils from './utils';


interface Props {
  photoList: Array<{ src: string, name: string }>,
  handlePrev: () => void,
  handleNext: () => void,
  onDisappearComplete: () => void,
  mainPhotoIndex: number,
  disappearName: string | null
}

const Slider: React.FC<Props> = ({ onDisappearComplete, photoList, mainPhotoIndex, handlePrev, handleNext, disappearName }) => {
  const sliderBoxEl: RefObject<HTMLDivElement> = useRef(null);

  async function prepareScene() {
    if (!sliderBoxEl.current) {
      return;
    }

    let wrapperEl: HTMLDivElement | null = document.querySelector('.slider__item__main');
    if (!wrapperEl) {
      return;
    }


    console.log('wrapperEl', wrapperEl);

    // 要分幾層。每層分配不同的像素來達到粒子化的效果
    const layerCount = 30;

    const canvas = await html2canvas(wrapperEl, {
      scale: 1
    });
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;


    // 2.再透過getImageData取得ImageData Instance
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    // 3. 把一張圖片分到n層去，隨機的取樣，做粒子化
    let samplerLayersList = Utils.sampler(imageData, imgWidth, imgHeight, layerCount)

    // 4. 把粒子化的特效畫到canvas上
    const updatedCanvasList = Utils.appendLayersWithParticleEffect(samplerLayersList, imgWidth, imgHeight, sliderBoxEl.current);
    // 原本的div消失，換上n層canvas
    wrapperEl.style.opacity = '0';
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
        setTimeout(() => {
          c.remove();
          if (index === updatedCanvasList.length - 1) {
            console.log('做完了', index);
            onDisappearComplete();
            // FIXME: 可能會有時間差，看要不要把wrapperEl傳給onDisappearComplete讓onDisappearComplete來處理
            if (wrapperEl) {
              wrapperEl.style.opacity = '1';
            }
          }
        }, removeDelay);
      }, 70 * index);
    });
  }

  useEffect(() => {
    if (disappearName) {
      prepareScene();
    }
  }, [disappearName]);

  return (
    <StyledSlider className="slider">
      <div className="slider__box" ref={sliderBoxEl}>
        {photoList.map((photoItem, index) => {
          const position = Utils.getPosition(index, mainPhotoIndex, photoList.length);
          return (
            <div className={`slider__item__${position}`}>
              <SliderItem
                key={`${photoItem.src}_${index}`}
                // key={index}
                photoItem={photoItem}
                handlePrev={handlePrev}
                handleNext={handleNext}
                position={position}
              />
            </div>
          )
        })}
      </div>
    </StyledSlider>

  );
}

export default Slider;
