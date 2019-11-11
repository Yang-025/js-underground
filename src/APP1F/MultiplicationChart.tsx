import React from 'react';
import './MultiplicationChart.scss';
import MultiplicationTitle from './MultiplicationTitle';
import MultiplicationCard from './MultiplicationCard';


const MultiplicationChart: React.FC = () => {
  return (
    <div className="multiplication-chart__container">
      <div className="multiplication-chart__items">
        {Array.from(Array(9).keys()).map(cardIndex => {
          const renderComponent  = cardIndex === 0 ? <MultiplicationTitle /> : <MultiplicationCard number={cardIndex + 1} />;
          return (
            <div className="multiplication-chart__items__item">
              {renderComponent}
            </div>
          )
        })}
      </div>
      <footer><p>Copyright © 2019 HexSchool. All rights reserved.</p></footer>
    </div>

  );
}

export default MultiplicationChart;
