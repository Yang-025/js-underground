import React, { useState, useEffect } from 'react';
import ClockStyles, { StyledClockFace, StyledHour, StyledMinute, StyledSecond } from './ClockStyles';
import { interval } from "rxjs";
import { ReactComponent as HourSvg } from './assets/hour-hand.svg';
import { ReactComponent as MinuteSvg } from './assets/minute-hand.svg';
import { ReactComponent as SecondSvg } from './assets/second-hand.svg';

enum TimeType {
  Hour,
  Minute,
  Second,
}

const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());

  // 讓時間動起來 方法一
  useEffect(() => {
    const tick = () => setDate(new Date());
    const clock$ = interval(1000).subscribe(tick);
    return () => clock$.unsubscribe();
  }, []);

  // 讓時間動起來 方法二
  // useEffect(() => {
  //   const interval = setInterval(() => setDate(new Date()), 1000);
  //   return () => clearInterval(interval);
  // }, []);


  // 讓時間動起來 方法三
  // function loop(){
  //   setDate(new Date());
  //   requestAnimationFrame(loop);
  // }

  // useEffect(() => {
  //   requestAnimationFrame(loop)
  // }, []);

  /* 
  時鐘共360度
  12小時會走完一圈，所以360/12=30，一小時是30度
  60分會走完一圈，所以360/60=6，一分是6度
  60秒會走完一圈，所以360/60=6，一秒是6度
  我們拿到的svg圖片起始角度，小時是在三點，所以要再扣3*30=90度
  // 我們拿到的svg圖片起始角度，秒是在6點，所以要再扣6*30=90度
  transform: rotate(-90deg);
  */
  function getDegree(timeType: TimeType) {
    // 取得目前的時分秒
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    if (timeType === TimeType.Hour) {
      // 把分也加入，更精確的計算小時的度數。一分鐘是六十分之一小時
      return (hours + (minutes / 60)) * 30 - 90;
    }
    if (timeType === TimeType.Minute) {
      return minutes * 6;
    }
    if (timeType === TimeType.Second) {
      return seconds * 6 - 180;
    }
    // return 0;
    throw new Error('Error');
  }

  return (
    <ClockStyles>
      <div className="clock-section">
        <StyledClockFace className="clock-face" />
        <StyledHour className="hour-hand" degree={getDegree(TimeType.Hour)}>
          <HourSvg />
        </StyledHour>
        <StyledMinute className="minute-hand" degree={getDegree(TimeType.Minute)}>
          <MinuteSvg />
        </StyledMinute>
        <StyledSecond className="second-hand" degree={getDegree(TimeType.Second)}>
          <SecondSvg />
        </StyledSecond>
      </div>
    </ClockStyles>
  );
}

export default Clock;
