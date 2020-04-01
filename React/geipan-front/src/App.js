import React from 'react';
import './App.css';
import './components/Table.js';
import Table from './components/Table.js';
import Observation from './components/TableCas.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <Observation name="myTable"></Observation>
      </header>
    </div>
  );
}

export default App;
