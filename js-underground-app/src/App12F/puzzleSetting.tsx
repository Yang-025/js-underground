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
    left: 0,
    top: 0,
    coordinate: [0, 0],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [0, -1] },
      { direction: 'right', coordinate: [1, 0] },
      { direction: 'down', coordinate: [0, 1] },
      { direction: 'left', coordinate: [-1, 0] },
    ],
    status: 'combined'
  },
  {
    id: 2,
    name: 'puzzle2',
    imgSrc: Puzzle2,
    imgPosition: { left: '-27px', top: '0px' },
    left: 180,
    top: 0,
    coordinate: [1, 0],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [1, -1] },
      { direction: 'right', coordinate: [2, 0] },
      { direction: 'down', coordinate: [1, 1] },
      { direction: 'left', coordinate: [0, 0] },
    ],
    status: 'combined'
  },
  {
    id: 3,
    name: 'puzzle3',
    imgSrc: Puzzle3,
    imgPosition: { left: '0px', top: '0px' },
    left: 360,
    top: 0,
    coordinate: [2, 0],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [2, -1] },
      { direction: 'right', coordinate: [3, 0] },
      { direction: 'down', coordinate: [2, 1] },
      { direction: 'left', coordinate: [1, 0] },
    ],
    status: 'combined'
  },
  {
    id: 4,
    name: 'puzzle4',
    imgSrc: Puzzle4,
    imgPosition: { left: '0px', top: '0px' },
    left: 0,
    top: 180,
    coordinate: [0, 1],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [0, 0] },
      { direction: 'right', coordinate: [1, 1] },
      { direction: 'down', coordinate: [0, 2] },
      { direction: 'left', coordinate: [-1, 1] },
    ],
    status: 'combined'
  },
  {
    id: 5,
    name: 'puzzle5',
    imgSrc: Puzzle5,
    imgPosition: { left: '0px', top: '-27px' },
    left: 180,
    top: 180,
    coordinate: [1, 1],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [1, 0] },
      { direction: 'right', coordinate: [2, 1] },
      { direction: 'down', coordinate: [1, 2] },
      { direction: 'left', coordinate: [0, 1] },
    ],
    status: 'combined'
  },
  {
    id: 6,
    name: 'puzzle6',
    imgSrc: Puzzle6,
    imgPosition: { left: '-27px', top: '0px' },
    left: 360,
    top: 180,
    coordinate: [2, 1],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [2, 0] },
      { direction: 'right', coordinate: [3, 1] },
      { direction: 'down', coordinate: [2, 2] },
      { direction: 'left', coordinate: [1, 1] },
    ],
    status: 'combined'
  },
  {
    id: 7,
    name: 'puzzle7',
    imgSrc: Puzzle7,
    imgPosition: { left: '0px', top: '-27px' },
    left: 0,
    top: 360,
    coordinate: [0, 2],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [0, 1] },
      { direction: 'right', coordinate: [1, 2] },
      { direction: 'down', coordinate: [0, 3] },
      { direction: 'left', coordinate: [-1, 2] },
    ],
    status: 'combined'
  },
  {
    id: 8,
    name: 'puzzle8',
    imgSrc: Puzzle8,
    imgPosition: { left: '-27px', top: '0px' },
    left: 180,
    top: 360,
    coordinate: [1, 2],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [1, 1] },
      { direction: 'right', coordinate: [2, 2] },
      { direction: 'down', coordinate: [1, 3] },
      { direction: 'left', coordinate: [0, 2] },
    ],
    status: 'combined'
  },
  {
    id: 9,
    name: 'puzzle9',
    imgSrc: Puzzle9,
    imgPosition: { left: '0px', top: '-27px' },
    left: 360,
    top: 360,
    coordinate: [2, 2],
    canMergeCoordinate: [
      { direction: 'top', coordinate: [2, 1] },
      { direction: 'right', coordinate: [3, 2] },
      { direction: 'down', coordinate: [2, 3] },
      { direction: 'left', coordinate: [1, 2] },
    ],
    status: 'combined'
  },
]


export default defaultPuzzleList;
