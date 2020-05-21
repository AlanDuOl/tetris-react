import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { BLOCK_INITIAL_SPEED, BLOCK_DELTA_SPEED, blockMoveDirections, NUM_TILES_WIDTH } from '../globals.js'
import { block, game } from '../libs/game.js'


function Display(props) {

    const [sideMove, setSideMove] = useState(true)
    const [canvas, setCanvas] = useState(null)
    const [ctx2D, setCtx2D] = useState(null)
    const [tileDim, setTileDim] = useState(0)
    const [timer, setTimer] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [speed, setSpeed] = useState(BLOCK_INITIAL_SPEED)
    const [startGame, setStartGame] = useState(false)
    const [reset, setReset] = useState(false)
    const [wall, setWall] = useState([])

    useEffect(() => {
        setCanvas(document.getElementById("display-viewport"))
    }, [])

    useEffect(() => {
        if (canvas) {
            setCtx2D(canvas.getContext("2d"))
            setTileDim(canvas.width / NUM_TILES_WIDTH)
            block.init(canvas.width, setPosition, setSpeed, props.setBlockState)
        }
    }, [canvas])

    useEffect(() => {
        if (props.gameReducer.gameOn) {
            setTimer(setInterval(draw, 50))
        }
        else {
            block.reset(canvas.width, setPosition, setSpeed, props.setBlockState)
            game.clearCanvas(ctx2D, canvas.width, canvas.height)
            clearInterval(timer)
        }
    }, [props.gameReducer.gameOn])

    // Draw
    useEffect(() => {
        if (props.gameReducer.gamePaused) {
            clearInterval(timer)
        }
        else {
            setTimer(setInterval(draw, 50))
        }
    }, [props.gameReducer.gamePaused])

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

    const draw = () => {
        if (ctx2D) {
            game.clearCanvas(ctx2D, canvas.width, canvas.height)
            block.draw(ctx2D, position, tileDim)
            block.moveDown(canvas.height, setPosition, position, tileDim, speed, setNewBlock)
        }
        console.log("need to clear interval")
    }
    
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