import { blockLoop, blockStart } from './block.js'
import { wallStart, wallLoop } from './wall.js'
import { TIMER_SPEED, LEVEL_FACTOR, actionType, GAME_INITIAL_LEVEL, GAME_INITIAL_SCORE } from '../globals.js'
const sqlite3 = require('sqlite3').verbose()


export function gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setUpdate, gameLevel, setGameState) {
    setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock, setUpdate, gameLevel, setGameState), TIMER_SPEED))
}

export function gamePause(timer) {
    clearInterval(timer)
}

export function gameFinish(timer, ctx2D, canvas, block, setBlock, setWall) {
    clearInterval(timer)
    gameClearCanvas(ctx2D, canvas)
    blockStart(canvas, block, setBlock)
    wallStart(setWall)
}

function gameLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, setUpdate, gameLevel, setGameState) {
    if (ctx2D) {
        gameClearCanvas(ctx2D, canvas)
        blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, setUpdate, gameLevel, setGameState)
        wallLoop(ctx2D, wall, canvas.tileDim)
    }
    console.log("need to clear interval")
}

function gameClearCanvas(ctx2D, canvas) {
    if (ctx2D) {
        ctx2D.clearRect(0, 0, canvas.width, canvas.height)
    }
}

export function gameResetInfo(setGameState) {
    setGameState(actionType.gameScore, GAME_INITIAL_SCORE)
    setGameState(actionType.gameLevel, GAME_INITIAL_LEVEL)
}

export function gameUpdateInfo(gameReducer, setGameState, numRemovedRows) {
    gameUpdateScore(gameReducer, setGameState, numRemovedRows)
    gameUpdateLevel(gameReducer, setGameState, numRemovedRows)
}

function gameUpdateScore(gameReducer, setGameState, numRemovedRows) {
    setGameState(actionType.gameScore, gameReducer.score + numRemovedRows)
}

function gameUpdateLevel(gameReducer, setGameState, numRemovedRows) {
    let newScore = gameReducer.score + numRemovedRows
    let scoreLevel = Math.round(newScore / LEVEL_FACTOR) + 1
    if (scoreLevel > gameReducer.level) {
        setGameState(actionType.gameLevel, gameReducer.level + 1)
    }
}

// export function gameConnectDb() {
//     let db = new sqlite3.Database('')
// }