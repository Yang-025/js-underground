import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import GoHome from './components/GoHome';
import LandingPage from './LandingPage';
import APP1F from './APP1F';
import APP2F from './APP2F';
import APP15F from './APP15F';
import App12F from './App12F';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <GoHome /> */}
          <div className="main">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/1f">
                <APP1F />
              </Route>
              <Route path="/2f">
                <APP2F />
              </Route>
              <Route path="/12f">
                <App12F />
              </Route>
              <Route path="/15f">
                <APP15F />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
