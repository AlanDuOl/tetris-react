import React, { useState, useEffect } from 'react';
import './App.css';
import Display from "./components/Display"
import Menu from './components/Menu'
import Score from './components/Score'
import Controls from './components/Controls'
import { gameInit } from './libs/game.js'
import { WALL_TILES_WIDTH, initialBlock } from './globals.js'

function App() {

    const [canvas, setCanvas] = useState({ width: 0, height: 0, tileDim: 0 })
    const [ctx2D, setCtx2D] = useState(null)
    const [timer, setTimer] = useState(0)
    const [wall, setWall] = useState(null)
    const [block, setBlock] = useState(null)

    // Init game props
    useEffect(() => {
      let canvas = document.getElementById("display-viewport")
      let canvasDims = { width: canvas.width, height: canvas.height, tileDim: canvas.width / WALL_TILES_WIDTH }
      setCanvas(canvasDims)
      setCtx2D(canvas.getContext("2d"))
      gameInit(canvasDims, setWall, initialBlock, setBlock)
    }, [])

    return (
      <div className="App">
        <Score />
        <Display />
        <Menu ctx2D={ctx2D} canvas={canvas} timer={timer} setTimer={setTimer} wall={wall} setWall={setWall} block={block} setBlock={setBlock} />
        <Controls canvas={canvas} wall={wall} setWall={setWall} block={block} setBlock={setBlock} />
      </div>
    );
}

export default App;
