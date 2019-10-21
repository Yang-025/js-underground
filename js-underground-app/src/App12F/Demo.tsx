import React, { useRef, RefObject, useEffect } from 'react';
import Puzzle1 from './assets/Puzzle-1.png';
import Puzzle2 from './assets/Puzzle-2.png';
import Puzzle3 from './assets/Puzzle-3.png';
import Puzzle4 from './assets/Puzzle-4.png';
import Puzzle5 from './assets/Puzzle-5.png';
import Puzzle6 from './assets/Puzzle-6.png';
import Puzzle7 from './assets/Puzzle-7.png';
import Puzzle8 from './assets/Puzzle-8.png';
import Puzzle9 from './assets/Puzzle-9.png';
import StyledDemo from './DemoStyles';
import { fromEvent } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';

const puzzleList = [
  {
    id: 1,
    name: 'puzzle1',
    imgSrc: Puzzle1,
    canMerge: [2, 4],
    position: { left: '0px', top: '0px' }
  },
  {
    id: 2,
    name: 'puzzle2',
    imgSrc: Puzzle2,
    canMerge: [1, 3, 5],
    position: { left: '-28px', top: '0px' }
  },
  // {
  //   id: 3,
  //   name: 'puzzle3',
  //   imgSrc: Puzzle3,
  //   canMerge: [2, 6],
  //   position: { right: '0px', top: '0px' }
  // },
  // {
  //   id: 4,
  //   name: 'puzzle4',
  //   imgSrc: Puzzle4,
  //   canMerge: [1, 5],
  //   position: { left: '0px', top: '0px' }
  // },
  // {
  //   id: 5,
  //   name: 'puzzle5',
  //   imgSrc: Puzzle5,
  //   canMerge: [2, 4, 6, 8],
  //   position: { left: '0px', top: '-28px' }
  // },
  // {
  //   id: 6,
  //   name: 'puzzle6',
  //   imgSrc: Puzzle6,
  //   canMerge: [3, 5, 9],
  //   position: { right: '0px', top: '0px' }
  // },
  // {
  //   id: 7,
  //   name: 'puzzle7',
  //   imgSrc: Puzzle7,
  //   canMerge: [4, 8],
  //   position: { left: '0px', top: '-28px' }
  // },
  // {
  //   id: 8,
  //   name: 'puzzle8',
  //   imgSrc: Puzzle8,
  //   canMerge: [5, 7, 9],
  //   position: { left: '-28px', bottom: '0px' }
  // },
  // {
  //   id: 9,
  //   name: 'puzzle9',
  //   imgSrc: Puzzle9,
  //   canMerge: [6, 8],
  //   position: { right: '0px', bottom: '0px' }
  // },
]

const Demo: React.FC = () => {
  const puzzle1El: RefObject<HTMLDivElement> = useRef(null);
  const puzzle1Dom = puzzle1El.current;


  useEffect(() => {
    if (!puzzle1El.current) {
      return;
    }
    const mousedown$ = fromEvent<MouseEvent>(puzzle1El.current, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(puzzle1El.current, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap((start) => {
        return mousemove$
          .pipe(
            map((event) => {
              console.log('start', start.offsetX, start.offsetY);
              // console.log('event', event);
              event.preventDefault();
              return {
                // left: event.clientX - start.offsetX,
                // top: event.clientY - start.offsetY,
                left: event.clientX,
                top: event.clientY,
              }
            }),
            takeUntil(mouseup$)
          )
      })
    )

    drag$.subscribe((pos) => {
      console.log('pos', pos);
      if (!puzzle1El.current) {
        return;
      }
      puzzle1El.current.style.top = `${pos.top}px`;
      puzzle1El.current.style.left = `${pos.left}px`;
      // 如果有拼接成功，那就合體。 1可以2、4拼
    });
  }, []);




  return (
    <StyledDemo>
      {/* <div className="box" ref={puzzle1El}>HAHAHAH</div> */}
      {puzzleList.map(item => {
        const positionStyle = {
          ...item.position
        }
        return (
          <div className="piece">
            <img style={positionStyle} src={item.imgSrc} alt="" />
          </div>
        )
      })}
    </StyledDemo>
  );
}

export default Demo;
