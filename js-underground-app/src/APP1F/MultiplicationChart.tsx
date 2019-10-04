import React from 'react';
import './MultiplicationChart.scss';
import MultiplicationTitle from './MultiplicationTitle';
import MultiplicationCard from './MultiplicationCard';


const MultiplicationChart: React.FC = () => {
    const cardsArray = Array.from(Array(9).keys()).filter(x => x > 0).map(cardIndex => {
        return <MultiplicationCard number={cardIndex + 1} />;
    });
    return (
        <div className="multiplication-chart-container">
            <div className="multiplication-chart-wrapper">
                <MultiplicationTitle />
                {cardsArray}
            </div>

            {/* <footer><p>Copyright © 2019 HexSchool. All rights reserved.</p></footer> */}
        </div>

    );
}

export default MultiplicationChart;
