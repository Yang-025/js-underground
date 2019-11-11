import React from 'react';
import { Link } from "react-router-dom";

import './GoHome.scss';


const GoHome: React.FC = () => {
  return (
    <div className="go-home"><Link to="/"><button className="go-home__btn">回首頁</button></Link></div>
  );
}

export default GoHome;
