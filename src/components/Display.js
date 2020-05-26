import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { NUM_TILES_WIDTH } from '../globals.js'
import { gameStart, gameFinish, gamePause } from '../libs/game.js'
import { blockMove, blockNewSpeed, blockStart, blockRotate } from '../libs/block.js'
import { wallStart } from '../libs/wall.js'


function Display(props) {

    const [canvas, setCanvas] = useState({ width: 0, height: 0, tileDim: 0 })
    const [ctx2D, setCtx2D] = useState(null)
    const [timer, setTimer] = useState(0)
    const [wall, setWall] = useState(null)
    const [blockInitialPos, setBlockInitialPos] = useState({ x: 0, y: 0 })
    const [block, setBlock] = useState({
        speed: 0,
        type: { name: "", fillStyle: "" },
        initialPos: { x: 0, y: 0},
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
        blockStart(block, setBlock, { x: canvas.width / 2, y: - canvas.width / NUM_TILES_WIDTH }, canvas.width / NUM_TILES_WIDTH)
        wallStart(setWall)
    }, [])

    // Start/End
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock)
        }
        else {
            // To avoid run on first render
            if (ctx2D) {
                gameFinish(timer, ctx2D, canvas, block, setBlock, blockInitialPos, setWall)
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
                gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock)
            }
        }
    }, [props.gameReducer.gamePaused])

    // Update
    //does not need to update in side move because the tile is an object and is passed by reference
    // useEffect(() => {
    //     if (props.gameReducer.gameOn && update) {
    //         gameUpdate(timer, setTimer, ctx2D, canvas, wall, setWall, block, setBlock)
    //     }
    //     setUpdate(false)
    //     console.log("updating")
    // }, [update])

    useEffect(() => {
        if (props.gameReducer.gameOn) {
            blockRotate(block, setBlock)
        }
    }, [props.blockReducer.rotate])

    // Block speed change
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            blockNewSpeed(block, setBlock)
        }
    }, [props.blockReducer.speedUp])

    // Block side move
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            // Side move must be done here because it depends on canvas dimentions unlike rotationAngle and speed that depends only on the
            blockMove(canvas, block, setBlock, props.setBlockState, props.blockReducer.moveDir)
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