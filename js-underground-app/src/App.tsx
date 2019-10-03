import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import APP1F from './APP1F';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2>JS 地下城</h2>

      <Router>
        <div>
          <nav className="navbar">
            <ul className="menu-items grid">
              <li>
                <Link to="/1f">1F-9x9乘法表</Link>
              </li>
              <li>
                <Link to="/2f">2F-時鐘</Link>
              </li>
            </ul>
          </nav>
          <div className="main">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/1f">
                <APP1F />
              </Route>
            </Switch>
          </div>

        </div>
      </Router>
    </div>
  );
}

export default App;
