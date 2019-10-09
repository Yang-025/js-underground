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
        // const layerIndex = Math.floor(layerCount * (Math.random() + 2 * x / canvasWidth) / 3);
        // y方向的分散到n層
        const layerIndex = Math.floor(layerCount * (Math.random() + 2 * y / canvasHeight) / 3);
        
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
    layerCanvasEl.height = canvasWidth;
    // 動畫效果
    layerCanvasEl.style.transition = `transform 1.2s ease-out, opacity 1.5s ease-out`;
    chuckCtx.putImageData(layerImageData, 0, 0);
    // 把這個<canvas>放到指定的<div>裡面
    el.appendChild(layerCanvasEl);
    return layerCanvasEl;
  });
  return updatedCanvasList;
}
