import Puzzle1 from './assets/Puzzle-1.png';
import Puzzle2 from './assets/Puzzle-2.png';
import Puzzle3 from './assets/Puzzle-3.png';
import Puzzle4 from './assets/Puzzle-4.png';
import Puzzle5 from './assets/Puzzle-5.png';
import Puzzle6 from './assets/Puzzle-6.png';
import Puzzle7 from './assets/Puzzle-7.png';
import Puzzle8 from './assets/Puzzle-8.png';
import Puzzle9 from './assets/Puzzle-9.png';
import * as Utils from './utils';

export const SnapThresholdInPx = 4;
export const PuzzleWidthInPx = 180;
export const PuzzleHeightInPx = 180;


function genFefaultPuzzleList() {
  let res = [];
  const imgMapping: { [key: number]: { imgSrc: string, imgPosition: { left: string, top: string } } } = {
    0: { imgSrc: Puzzle1, imgPosition: { left: '0px', top: '0px' } },
    1: { imgSrc: Puzzle2, imgPosition: { left: '-27px', top: '0px' } },
    2: { imgSrc: Puzzle3, imgPosition: { left: '0px', top: '0px' } },
    3: { imgSrc: Puzzle4, imgPosition: { left: '0px', top: '0px' } },
    4: { imgSrc: Puzzle5, imgPosition: { left: '0px', top: '-27px' } },
    5: { imgSrc: Puzzle6, imgPosition: { left: '-27px', top: '0px' } },
    6: { imgSrc: Puzzle7, imgPosition: { left: '0px', top: '-27px' } },
    7: { imgSrc: Puzzle8, imgPosition: { left: '-27px', top: '0px' } },
    8: { imgSrc: Puzzle9, imgPosition: { left: '0px', top: '-27px' } },
  }

  for (let x = 0; x < 3; x++) {
    // TODO y先改成1做測試，記得改回3
    for (let y = 0; y < 1; y++) {
      console.log(`id: ${x + y + 2 * y}, 座標: (${x}, ${y})`);
      const id = x + y + 2 * y;
      const info = {
        id,
        name: `puzzle${id}`,
        imgSrc: imgMapping[id]['imgSrc'],
        imgPosition: imgMapping[id]['imgPosition'],
        left: 0 + x * PuzzleWidthInPx,
        top: 0 + y * PuzzleHeightInPx,
        coordinate: [x, y],
        canMergeCoordinate: [
          { direction: 'top', coordinate: [x, y - 1] },
          { direction: 'right', coordinate: [x + 1, y] },
          { direction: 'down', coordinate: [x, y + 1] },
          { direction: 'left', coordinate: [x - 1, y] },
        ],
        status: 'combined'
      }
      res.push(info);
    }
  }
  return res;
}


const defaultPuzzleList = genFefaultPuzzleList().map(item => {
  return {
    ...item,
    // TODO 可以拖拉的範圍要怎麼決定？ 
    left: Utils.randomNumberInRange(0,1000),
    top: Utils.randomNumberInRange(0,400),
  }
});


export default defaultPuzzleList;
