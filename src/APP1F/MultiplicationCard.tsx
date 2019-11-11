import React from 'react';
import './MultiplicationCard.scss';


interface Props {
    number: number
}

const MultiplicationCard: React.FC<Props> = ({ number }) => {

    return (
        <div className="multiplication-card">
            <div className="multiplication-card__title">{number}</div>
            {
                Array.from(Array(9).keys()).map((index) => {
                    let base = index + 1;
                    return <div className="multiplication-card__formula">{`${number} X ${base} = ${number*base}`}</div>;
                })
            }
        </div>

    );
}

export default MultiplicationCard;
