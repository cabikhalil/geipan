import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './components/Table.js';
import Details from './components/Details.js';
import Observation from './components/TableCas.js';

function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
       
        <Switch>
          <Route path="/" exact component={Observation}></Route>
          <Route path="/cas/:_id" exact component={Details}></Route>
        </Switch>
        
      </header>
    </div>
    </Router>
    
  );
}

export default App;
