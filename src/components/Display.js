import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { BLOCK_INITIAL_SPEED, blockMoveDirection, NUM_TILES_WIDTH } from '../globals.js'
import { gameStart, gameFinish, gamePause, gameResume, gameUpdate, gamePreventUpdate } from '../libs/game.js'
import { blockMoveSide, blockSpeedUp, blockStart } from '../libs/block.js'


function Display(props) {

    const [sideMove, setSideMove] = useState(false)
    const [canvas, setCanvas] = useState({ width: 0, height: 0, tileDim: 0 })
    const [ctx2D, setCtx2D] = useState(null)
    const [timer, setTimer] = useState(0)
    const [speedChange, setSpeedChange] = useState(false)
    const [rotationChange, setRotationChange] = useState(false)
    const [wall, setWall] = useState([])
    const [tiles, setTiles] = useState([])

    // Init game props
    useEffect(() => {
        let canvas = document.getElementById("display-viewport")
        setCanvas({ width: canvas.width, height: canvas.height, tileDim: canvas.width / NUM_TILES_WIDTH })
        setCtx2D(canvas.getContext("2d"))
        blockStart(canvas, props.setBlockState)
    }, [])

    // Start/End
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            gameStart(setTimer, ctx2D, wall, props.blockReducer, canvas, props.setBlockState)
        }
        else {
            // To avoid run on first render
            if (ctx2D) {
                gameFinish(timer, ctx2D, canvas, props.setBlockState)
            }
        }
    }, [props.gameReducer.gameOn])

    // Pause/Resume
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            if (props.gameReducer.gamePaused) {
                gamePause(timer)
            }
            else {
                gameResume(setTimer, ctx2D, wall, props.blockReducer, canvas, props.setBlockState)
            }
        }
    }, [props.gameReducer.gamePaused])

    // Update
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            if (sideMove || speedChange || rotationChange) {
                gameUpdate(timer, setTimer, ctx2D, wall, props.blockReducer, canvas, props.setBlockState)
                gamePreventUpdate(setSideMove, setSpeedChange, setRotationChange)
            }
        }
    }, [sideMove, speedChange, rotationChange])

    useEffect(() => {
        if (props.gameReducer.gameOn) {
            setRotationChange(true)
        }
    }, [props.blockReducer.rotationAngle])

    // Block speed change
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            blockSpeedUp(setSpeedChange)
        }
    }, [props.blockReducer.speed])

    // Block side move
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            blockMoveSide(canvas, setSideMove, props.blockReducer, props.setBlockState)
        }
    }, [props.blockReducer.moveDir])

    return (
        <main id="display">
            <canvas id="display-viewport" width="200" height="300">
                Browser version does not support the game
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