import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { WALL_TILES_WIDTH } from '../globals.js'
import { gameStart, gameFinish, gamePause, gameUpdateInfo, gameResetInfo } from '../libs/game.js'
import { blockMoveSide, blockNewSpeed, blockStart, blockRotate } from '../libs/block.js'
import { wallStart } from '../libs/wall.js'


function Display(props) {

    const [canvas, setCanvas] = useState({ width: 0, height: 0, tileDim: 0 })
    const [ctx2D, setCtx2D] = useState(null)
    const [timer, setTimer] = useState(0)
    const [wall, setWall] = useState(null)
    const [update, setUpdate] = useState({})
    const [block, setBlock] = useState({
        speed: 0,
        type: { name: "", fillStyle: "" },
        rotationAngle: 0,
        rotationPoint: { x:0, Y:0 },
        tiles: []
    })

    // Init game props
    useEffect(() => {
        let canvas = document.getElementById("display-viewport")
        setCanvas({ width: canvas.width, height: canvas.height, tileDim: canvas.width / WALL_TILES_WIDTH })
        setCtx2D(canvas.getContext("2d"))
        blockStart({ width: canvas.width, height: canvas.height, tileDim: canvas.width / WALL_TILES_WIDTH }, block, setBlock)
        wallStart(setWall)
        setUpdate({ needToUpdate: false, numRemovedRows: 0 })
    }, [])

    // Update game info
    useEffect(() => {
        if (props.gameReducer.gameOn && update.needToUpdate) {
            gameUpdateInfo(props.gameReducer, props.setGameState, update.numRemovedRows)
            setUpdate({ needToUpdate: false, numRemovedRows: 0 })
        }
    }, [update])

    // Start/End
    useEffect(() => {
        if (props.gameReducer.gameOn) {
            gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setUpdate, props.gameReducer.level, props.setGameState)
        }
        else {
            // To avoid run on first render
            if (ctx2D) {
                gameFinish(timer, ctx2D, canvas, block, setBlock, setWall)
                gameResetInfo(props.setGameState)
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
                gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setUpdate, props.gameReducer.level, props.setGameState)
            }
        }
    }, [props.gameReducer.gamePaused])

    useEffect(() => {
        if (props.gameReducer.gameOn) {
            blockRotate(block, setBlock, wall, canvas)
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
            blockMoveSide(canvas, wall, block, setBlock, props.setBlockState, props.blockReducer.moveDir)
        }
    }, [props.blockReducer.moveDir])

    return (
        <main id="display">
            <canvas id="display-viewport" width="200" height="340">
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