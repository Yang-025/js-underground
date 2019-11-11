import React from 'react';
import { Link } from "react-router-dom";

import '../App.scss';

const LandingPage: React.FC = () => {
  return (
    <div className="App">
      <h2>JS 地下城</h2>
        <div>
          <nav className="navbar">
            <ul className="menu-items grid">
              <li>
                <Link to="/1f">1F-9x9乘法表</Link>
              </li>
              <li>
                <Link to="/2f">2F-時鐘</Link>
              </li>
              <li>
                <Link to="/12f">12F - 拼圖</Link>
              </li>
              <li>
                <Link to="/15f">15F-死亡筆記本</Link>
              </li>
            </ul>
          </nav>
        </div>
    </div>
  );
}

export default LandingPage;
