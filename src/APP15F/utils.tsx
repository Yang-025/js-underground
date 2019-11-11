import * as R from 'ramda';


/*
創造全新空白的ImageData Instance
layerCount: 要做幾層
width: 要做多寬
height: 要做多高
*/
export function initLayersList(layerCount: number, width: number, height: number) {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  return R.range(0, layerCount).map(() => {
    return ctx.createImageData(width, height)
  })
}


/*
sourceImgData: 原本的圖片ImageData
*/
export function sampler(sourceImgData: ImageData, canvasWidth: number, canvasHeight: number, layerCount: number) {
  // 創造n個空白的ImageData Instance陣列
  const emptyLayersList: Array<ImageData> = initLayersList(layerCount, canvasWidth, canvasHeight);

  // 把抽到的index補上像素
  let newImgDatas = R.clone(emptyLayersList);
  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      for (let l = 0; l < 2; l++) {
        // 把原本的圖片分散到n層
        // x方向的分散到n層
        const layerIndex = Math.floor(layerCount * (Math.random() + 2 * x / canvasWidth) / 3);
        // y方向的分散到n層
        // const layerIndex = Math.floor(layerCount * (Math.random() + 2 * y / canvasHeight) / 3);

        // 取得像素R的位子
        const pixelPos = 4 * (x + y * canvasWidth);
        // 找到R就找到R,G,B,A
        for (let rgbaIndex = 0; rgbaIndex < 4; rgbaIndex++) {
          const dataPos = pixelPos + rgbaIndex;
          newImgDatas[layerIndex].data[dataPos] = sourceImgData.data[dataPos];
        }
      }
    }
  }
  return newImgDatas;
}


/*
把canvas層補到畫面上
*/
export function appendLayersWithParticleEffect(samplerLayersList: ImageData[], canvasWidth: number, canvasHeight: number, el: HTMLElement) {
  const updatedCanvasList = samplerLayersList.map((layerImageData) => {
    const layerCanvasEl = document.createElement('canvas');
    const chuckCtx = layerCanvasEl.getContext('2d')!;
    layerCanvasEl.width = canvasWidth;
    layerCanvasEl.height = canvasHeight;
    // 
    layerCanvasEl.style.zIndex = '5';
    layerCanvasEl.style.transform = 'translate3d(0, 0, 0)';
    // 動畫效果
    layerCanvasEl.style.transition = `transform 1.2s ease-out, opacity 1.5s ease-out`;
    chuckCtx.putImageData(layerImageData, 0, 0);
    // 把這個<canvas>放到指定的<div>裡面
    el.appendChild(layerCanvasEl);
    return layerCanvasEl;
  });
  return updatedCanvasList;
}


export function startParticleEffect(canvasLayersList: HTMLCanvasElement[], onCompletedCallback: Function) {
  canvasLayersList.forEach((c: HTMLCanvasElement, index: number) => {
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
        if (index === canvasLayersList.length - 1) {
          onCompletedCallback();
        }
      }, removeDelay);
    }, 70 * index);
  });
}



/* ********** asyncForEach********** */
// const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function asyncForEach(array: any[], callback: (el: any, index: number, arr: any[]) => void): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/* ********** asyncForEach ********** */

/* ********** 計算自己在輪播牆中的位置 
photoIndex: 我的編號
photoCount: 總共有幾張照片
mainPhotoIndex：現在在中間的照片是誰
********** */
export const getPosition = (photoIndex: number, mainPhotoIndex: number, photoCount: number) => {
  /* ********** 考慮1張的情況 ********** */
  if (photoCount === 1) {
    return 'main'
  }
  /* ********** 考慮1張的情況 END ********** */


  /* ********** 考慮2張的情況 ********** */
  if (photoCount === 2) {
    if (photoIndex === mainPhotoIndex) {
      return 'main'
    }
    return 'right';
  }
  /* ********** 考慮2張的情況 END ********** */


  /* ********** 考慮3張以上的情況 ********** */
  // 第一張的左邊是陣列的最後一張
  if (mainPhotoIndex === 0) {
    if (photoIndex === photoCount - 1) { return 'left'; }
  }

  // 最後一張的右邊是陣列的第一張
  if (mainPhotoIndex === photoCount - 1) {
    // 它的右邊是陣列的第一張
    if (photoIndex === 0) { return 'right'; }
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
  /* ********** 考慮3張以上的情況 END ********** */
}
/* ********** 計算自己在輪播牆中的位置 END ********** */



export function circularSortArray(arr: any[]): any[] {
  return arr.map((item, index) => {
    let dd = arr.map((innerItem, innerIndex) => {
      return arr[(index + innerIndex) % arr.length]
    })
    return dd
  })
}
