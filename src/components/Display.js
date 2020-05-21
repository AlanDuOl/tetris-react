import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { BLOCK_INITIAL_SPEED, BLOCK_DELTA_SPEED, blockMoveDirection, NUM_TILES_WIDTH } from '../globals.js'
import { start as gameStart, finish as gameFinish } from '../libs/game.js'


function Display(props) {

    const [sideMove, setSideMove] = useState(true)
    const [canvas, setCanvas] = useState({ width: 0, height: 0 })
    const [ctx2D, setCtx2D] = useState(null)
    const [tileDim, setTileDim] = useState(0)
    const [timer, setTimer] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [speed, setSpeed] = useState(BLOCK_INITIAL_SPEED)
    const [startGame, setStartGame] = useState(false)
    const [reset, setReset] = useState(false)
    const [wall, setWall] = useState([])

    useEffect(() => {
        let canvas = document.getElementById("display-viewport")
        setCanvas({ width: canvas.width, height: canvas.height })
        setCtx2D(canvas.getContext("2d"))
        setTileDim(canvas.width / NUM_TILES_WIDTH)
    }, [])

    useEffect(() => {
        if (props.gameReducer.gameOn) {
            gameStart(setTimer, ctx2D, wall, props.blockReducer, canvas, tileDim)
        }
        else {
            gameFinish(timer, ctx2D, canvas)
        }
    }, [props.gameReducer.gameOn])

    // Draw
    // useEffect(() => {
    //     if (props.gameReducer.gamePaused) {
    //         clearInterval(timer)
    //     }
    //     else {
    //         setTimer(setInterval(draw, 50))
    //     }
    // }, [props.gameReducer.gamePaused])

    // useEffect(() => {

    // }, [props.blockReducer.rotation])

    // useEffect(() => {
    //     if (ctx2D) {
    //         // Remove timer with old speed
    //         clearInterval(timer)
    //         // Update speed
    //         setSpeed(speed + BLOCK_DELTA_SPEED)
    //     }
    // }, [props.blockReducer.speed])

    
    
    // Side move
    // useEffect(() => {
    //     if (canvas) {
    //         block.moveSide(canvas.width, props.blockReducer.moveDir, setPosition, position, tileDim, setSideMove, sideMove, timer, setBlockState)
    //     }
    // }, [props.blockReducer.moveDir])

    return (
        <main id="display">
            <canvas id="display-viewport" width="200" height="300">
                Element not suported by this browser
            </canvas>
        </main>
    )
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setBlockState: (actionType, actionValue) => dispatch(setBlockState(actionType, actionValue)),
    setGameState: (actionType, actionValue) => dispatch(setGameState(actionType, actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Display)