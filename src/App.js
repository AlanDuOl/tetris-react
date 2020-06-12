import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Display from "./components/Display"
import Menu from './components/Menu'
import Score from './components/Score'
import Controls from './components/Controls'
import { setGameState } from './actions/gameActions.js'
import { Game } from './libs/game.js'
import { WALL_TILES_WIDTH } from './globals.js'

function App(props) {

    // const [canvas, setCanvas] = useState(null)
    // const [ctx2D, setCtx2D] = useState(null)
    // const [timer, setTimer] = useState(undefined)
    // const [wall, setWall] = useState(null)
    // const [block, setBlock] = useState(null)
    const [game, setGame] = useState(null)

    // Init game props
    useEffect(() => {
        let canvas = document.getElementById("display-viewport")
        const canvasDims = { width: canvas.width, height: canvas.height, tileDim: canvas.width / WALL_TILES_WIDTH }
        const ctx2D = canvas.getContext("2d")
        const newGame = new Game(ctx2D, canvasDims, props.setGameState)
        setGame(newGame)
    }, [props.setGameState])

    useEffect(() => {
        game.init()
    }, [game])

    return (
        <div className="App">
            <Score info={game.info} />
            <Display game={game} />
            <Menu game={game} />
            <Controls game={game} />
        </div>
    );
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  setGameState: (actionType, actionValue) => dispatch(setGameState(actionType, actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
