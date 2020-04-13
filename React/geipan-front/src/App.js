import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './components/Table.js';
import Form from './components/FormGeipan.js';
import Details from './components/Details.js';
import TableCas from './components/TableCas.js';
import DetailsTemoignage from './components/DetailsTemoignage.js';
import Nav from './components/NavBar.js';
import Stats from './components/Stats.js';

function App() {
  return (
    <Router>
      <div className="App">
    
      <header className="App-header">
       
        <Switch>
          <Route path="/" exact component={Form}></Route>
          <Route path="/filteredcas/:params" exact component={TableCas}></Route>
          <Route path="/cas/details/:_id" exact component={Details}></Route>
          <Route path="/cas/details/temoignage/:id_temoignage" exact component={DetailsTemoignage}></Route>
        </Switch>

      </header>
    </div>
    </Router>
    
  );
}

export default App;
