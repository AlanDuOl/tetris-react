import React from 'react';
import './App.css';
import Display from "./components/Display"
import Menu from './components/Menu'
import Score from './components/Score'
import Controls from './components/Controls'

function App() {
  return (
    <div className="App">
        <Score />
        <Display />
        <Menu />
        <Controls />
    </div>
  );
}

export default App;
