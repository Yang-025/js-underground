import React from 'react';
import './MultiplicationTitle.scss';

const DecoLine: React.FC = () => {
  return (
    <div className="multiplication-title__deco-line">
      <span />
    </div>
  )
}


const MultiplicationTitle: React.FC = () => {
  return (
    <div className="multiplication-title">
      <DecoLine />
      <div>
        <span className="p1">九九乘法表</span>
        <span className="p2">MULTIPLICATION CHART</span>
      </div>
      <DecoLine />
    </div>
  );
}


export default MultiplicationTitle;
