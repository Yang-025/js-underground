import React, { useState, Fragment, useRef, RefObject, useEffect } from 'react';
import html2canvas from 'html2canvas';
import StyledSlider from './SliderStyle';
import SliderItem from './SliderItem';
import * as Utils from './utils';

interface Props {
  photoList: Array<{ src: string, name: string }>,
  disappearList: string[],
  setPhotoList: (photoList: []) => void,
  onDisappearComplete: () => void,
}


const Slider: React.FC<Props> = (props) => {
  const { disappearList, photoList, setPhotoList, onDisappearComplete } = props;
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const sliderBoxEl: RefObject<HTMLDivElement> = useRef(null);

  // 移動到要消失的item
  async function moveTo() {
    // 找到這個item在輪播牆的index
    const photoIndex = photoList.map(x => x.name).indexOf(disappearList[0]);
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
    // FIXME handleNext會有時間差，如果delay沒有控制好，可能會消失到別張圖
    await Utils.delay(500);
  }

  async function prepareScene() {
    // 移動到要消失的item
    await moveTo();

    // 要分幾層。每層分配不同的像素來達到粒子化的效果
    const layerCount = 30;
    if (!sliderBoxEl.current) {
      return;
    }
    let wrapperEl: HTMLDivElement | null = document.querySelector('.slider__item__main');
    if (!wrapperEl) {
      return;
    }
    console.log('wrapperEl', wrapperEl);
    const canvas = await html2canvas(wrapperEl, { scale: 1 });
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


    // 5. 消失。每一層的canvas加上不同動畫效果，執行下去
    Utils.startParticleEffect(updatedCanvasList, () => {
      // 把圖片從photoList移除
      let updatePhotoList = photoList.filter(x => x.name !== disappearList[0])
      if (updatePhotoList.length > 0) {
        // 方法一： 移動陣列
        let updatePhotoList2 = Utils.circularSortArray(updatePhotoList);
        setPhotoList(updatePhotoList2[mainPhotoIndex % updatePhotoList2.length]);
        setMainPhotoIndex(0);

        // 方法二： 不移動陣列，設定index
        // setPhotoList(updatePhotoList);
        // setMainPhotoIndex(updatePhotoList.length === mainPhotoIndex ? 0 : mainPhotoIndex);
      }
      onDisappearComplete();
    })
  }

  useEffect(() => {
    // 如果disappearList有item，就做出消失的效果
    if (disappearList.length > 0) {
      prepareScene();
    }
  }, [JSON.stringify(disappearList)]);


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
    <StyledSlider className="slider">
      <div className="slider__box" ref={sliderBoxEl}>
        {photoList.map((photoItem, index) => {
          const position = Utils.getPosition(index, mainPhotoIndex, photoList.length);
          return (
            <div className={`slider__item__${position}`} key={`${photoItem.src}_${index}`}>
              <SliderItem
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
