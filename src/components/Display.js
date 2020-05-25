import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { NUM_TILES_WIDTH } from '../globals.js'
import { gameStart, gameFinish, gamePause, gameUpdate, gamePreventUpdate } from '../libs/game.js'
import { blockMove, blockSpeedUp, blockStart } from '../libs/block.js'
import { wallStart } from '../libs/wall.js'


function Display(props) {

    const [sideMove, setSideMove] = useState(false)
    const [canvas, setCanvas] = useState({ width: 0, height: 0, tileDim: 0 })
    const [ctx2D, setCtx2D] = useState(null)
    const [timer, setTimer] = useState(0)
    const [update, setUpdate] = useState(false)
    const [wall, setWall] = useState(null)
    const [blockInitialPos, setBlockInitialPos] = useState({ x: 0, y: 0 })
    const [blockRestart, setBlockRestart] = useState(false)
    const [block, setBlock] = useState({
        speed: 0,
        type: { name: "", fillStyle: "" },
        position: { x: 0, y: 0 },
        rotationAngle: 0,
        tiles: []
    })

    // Init game props
    useEffect(() => {
        let canvas = document.getElementById("display-viewport")
        setCanvas({ width: canvas.width, height: canvas.height, tileDim: canvas.width / NUM_TILES_WIDTH })
        setCtx2D(canvas.getContext("2d"))
        setBlockInitialPos({ x: canvas.width / 2, y: - canvas.width / NUM_TILES_WIDTH })
        // blockStart({ x: canvas.width / 2, y: - canvas.width / NUM_TILES_WIDTH }, props.setBlockState, canvas.width / NUM_TILES_WIDTH)
        blockStart(setBlock, block, { x: canvas.width / 2, y: - canvas.width / NUM_TILES_WIDTH }, canvas.width / NUM_TILES_WIDTH)
        wallStart(setWall)
    }, [])
    // Restart block
    useEffect(() => {
        if (props.gameReducer.gameOn && blockRestart) {
            blockStart(setBlock, block, blockInitialPos, canvas.tileDim)
            setBlockRestart(false)
            setUpdate(true)
        }
    }, [blockRestart])

    // Start/End
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setBlockRestart)
        }
        else {
            // To avoid run on first render
            if (ctx2D) {
                gameFinish(timer, ctx2D, canvas, blockInitialPos, setBlock, setWall)
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
                gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setBlockRestart)
            }
        }
    }, [props.gameReducer.gamePaused])

    // Update
    //does not need to update in side move because the tile is an object and is passed by reference
    useEffect(() => {
        if (props.gameReducer.gameOn && update) {
            gameUpdate(timer, setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setBlockRestart)
            setUpdate(false)
        }
    }, [update])

    useEffect(() => {
        if (props.gameReducer.gameOn) {
            setUpdate(true)
        }
    }, [props.blockReducer.rotationAngle])

    // Block speed change
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            blockSpeedUp(block, setBlock, setUpdate, props.blockReducer.speed)
        }
    }, [props.blockReducer.speed])

    // Block side move
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            // Side move must be done here because it depends on canvas dimentions unlike rotationAngle and speed that depends only on the
            blockMove(canvas, block, setBlock, props.setBlockState)
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