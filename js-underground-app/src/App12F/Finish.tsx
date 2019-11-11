import React, { useRef, useEffect, useState, RefObject } from 'react';
import { PuzzleItem } from './interface';
import * as R from 'ramda';
import { StyledFinish, StyledDesc } from './FinishStyles';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface IProps {
  puzzleList: PuzzleItem[];
  playAgain: () => void;
}

const Finish: React.FC<IProps> = (props) => {
  const { puzzleList } = props;
  const [position, setPosition] = useState<{ left: number, top: number }>({ left: puzzleList[0].left, top: puzzleList[0].top });
  const [effect, setEffect] = useState<boolean>(false);
  const puzzleEl: RefObject<HTMLDivElement> = useRef(null);
  const descEl: RefObject<HTMLDivElement> = useRef(null);


  useEffect(() => {
    setTimeout(async () => {
      if (!descEl.current || !puzzleEl.current) {
        return;
      }
      puzzleEl.current.style.left = 'calc(50% - 270px)';
      puzzleEl.current.style.top = 'calc(50% - 270px)';
      await delay(2000);
      setEffect(true);
      await delay(3000);
      setEffect(false);
      await delay(1000);
      puzzleEl.current.style.transform = 'translateX(-45%)';
      descEl.current.style.transition = 'all ease-in-out 1s';
      descEl.current.style.visibility = 'visible';
      descEl.current.style.transform = 'translateX(220px)';
    }, 1000);
  }, []);


  return (
    <div className="parent">
      <StyledFinish ref={puzzleEl} left={position.left} top={position.top} effect={effect}>
        {R.sortBy(R.prop('id'), puzzleList).map(item => {
          return (
            <div className="puzzle">
              <img style={{ ...item.imgPosition }} src={item.imgSrc} alt="" />
            </div>
          );
        })}
      </StyledFinish>
      <StyledDesc ref={descEl} className="desc">
        <h1 className="desc__h1">清院本清明上河圖</h1>
        <p className="desc__text bold">
          陳枚、孫祜、金昆、戴洪、程志道<br />
          清高宗乾隆元年（1736）</p>
        <p className="desc__text">宋張澤端（活動於西元十二世紀前期）「清明上河圖」是畫史中寫實風俗畫的一件傑作，歷代臨仿者甚多，在故宮即藏有七種不同的本子，其中就屬清院本「清明上河圖」最為有名。 <br /><br />
          此卷為乾隆元年（一七三六）由宮廷畫院畫師陳枚、孫祜、金昆、戴洪、程志道等五人合繪。
          此卷設色鮮麗，用筆圓熟，界畫橋樑、屋宇及人物皆十分細膩嚴謹，是院畫中之極精者。所畫事物甚多，雖失去了宋代古制，但也足以代表明清之際北京風物。</p>
        <button className="desc__btn" onClick={() => { props.playAgain(); }}>再玩一次</button>
      </StyledDesc>
    </div>
  );
}

export default Finish;
