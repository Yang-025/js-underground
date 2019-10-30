import Puzzle1 from './assets/Puzzle-1.png';
import Puzzle2 from './assets/Puzzle-2.png';
import Puzzle3 from './assets/Puzzle-3.png';
import Puzzle4 from './assets/Puzzle-4.png';
import Puzzle5 from './assets/Puzzle-5.png';
import Puzzle6 from './assets/Puzzle-6.png';
import Puzzle7 from './assets/Puzzle-7.png';
import Puzzle8 from './assets/Puzzle-8.png';
import Puzzle9 from './assets/Puzzle-9.png';


export const SnapThresholdInPx = 4;
export const PuzzleWidthInPx = 180;
export const PuzzleHeightInPx = 180;


const defaultPuzzleList = [
  {
    id: 1,
    name: 'puzzle1',
    imgSrc: Puzzle1,
    imgPosition: { left: '0px', top: '0px' },
    left: 40,
    top: 40,
    coordinate: [0, 0],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [0, -1] },
      { direction: 'right', coordinate: [1, 0] },
      { direction: 'down', coordinate: [0, 1] },
      { direction: 'left', coordinate: [-1, 0] },
    ]
  },
  {
    id: 2,
    name: 'puzzle2',
    imgSrc: Puzzle2,
    imgPosition: { left: '-28px', top: '0px' },
    left: 500,
    top: 300,
    coordinate: [1, 0],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [1, -1] },
      { direction: 'right', coordinate: [2, 0] },
      { direction: 'down', coordinate: [1, 1] },
      { direction: 'left', coordinate: [0, 0] },
    ]
  },
  // {
  //   id: 3,
  //   name: 'puzzle3',
  //   imgSrc: Puzzle3,
  //   canMerge: [2, 6],
  //   imgPosition: { right: '0px', top: '0px' }
  // },
  // {
  //   id: 4,
  //   name: 'puzzle4',
  //   imgSrc: Puzzle4,
  //   canMerge: [1, 5],
  //   imgPosition: { left: '0px', top: '0px' }
  // },
  // {
  //   id: 5,
  //   name: 'puzzle5',
  //   imgSrc: Puzzle5,
  //   canMerge: [2, 4, 6, 8],
  //   imgPosition: { left: '0px', top: '-28px' }
  // },
  // {
  //   id: 6,
  //   name: 'puzzle6',
  //   imgSrc: Puzzle6,
  //   canMerge: [3, 5, 9],
  //   imgPosition: { right: '0px', top: '0px' }
  // },
  // {
  //   id: 7,
  //   name: 'puzzle7',
  //   imgSrc: Puzzle7,
  //   canMerge: [4, 8],
  //   imgPosition: { left: '0px', top: '-28px' }
  // },
  // {
  //   id: 8,
  //   name: 'puzzle8',
  //   imgSrc: Puzzle8,
  //   canMerge: [5, 7, 9],
  //   imgPosition: { left: '-28px', bottom: '0px' }
  // },
  // {
  //   id: 9,
  //   name: 'puzzle9',
  //   imgSrc: Puzzle9,
  //   canMerge: [6, 8],
  //   imgPosition: { right: '0px', bottom: '0px' }
  // },
]


export default defaultPuzzleList;
