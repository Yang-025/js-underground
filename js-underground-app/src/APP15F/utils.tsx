
import Chance from 'chance';
import * as R from 'ramda';


export function genEmptyImageDataList(imageData: ImageData, chunkNum: number) {
  const chunkImgDataArray = [];
  for (let i = 0; i < chunkNum; i++) {
    let arr = new Uint8ClampedArray(imageData.data);
    for (let j = 0; j < arr.length; j++) {
      arr[j] = 0;
    }
    chunkImgDataArray.push(arr);
  }
  return chunkImgDataArray;
}

export function sampling(chunkImgDataArray: Array<Uint8ClampedArray>, imageData: ImageData, width: number, height: number, chunkNum: number) {
  let newChunkImgDataArray = R.clone(chunkImgDataArray);
  const pixelArr = imageData.data;
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      const idx = weightedRandomDistrib(h, height, chunkNum);
      // FIXME 不知道要用什麼型別
      // const chunkImgData: any = chunkImgDataArray[idx];
      const pixelIdx = (h * width + w) * 4;
      for (let offset = 0; offset < 4; offset++) {
        newChunkImgDataArray[idx][pixelIdx + offset] = pixelArr[pixelIdx + offset];
      }
    }
  }
  console.log('newChunkImgDataArray === chunkImgDataArray', newChunkImgDataArray === chunkImgDataArray)
  return newChunkImgDataArray;
}


// sampling function
export function weightedRandomDistrib(h: number, height: number, chunkNum: number) {
  const prob = [];
  const seq = [];
  for (let i = 0; i < chunkNum; i++) {
    const dataIndex = Math.floor(h / (height / chunkNum));
    const diff = Math.abs(dataIndex - i);
    prob.push(Math.pow(chunkNum - diff, 6));
    seq.push(i);
  }
  const chance = new Chance();
  return chance.weighted(seq, prob);
}



export function genEmptyImageDataList2(canvas: HTMLCanvasElement, layerCount: number) {
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  return R.range(0, layerCount).map(item => {
    return ctx.createImageData(canvas.width, canvas.height)
  })
}
