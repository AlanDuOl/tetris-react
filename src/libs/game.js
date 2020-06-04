import { blockLoop, blockStart } from './block.js'
import { wallStart, wallLoop } from './wall.js'
import { TIMER_SPEED, LEVEL_FACTOR, actionType } from '../globals.js'


export function gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setUpdateInfo, gameLevel) {
    setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock, setUpdateInfo, gameLevel), TIMER_SPEED))
}

export function gamePause(timer) {
    clearInterval(timer)
}

export function gameFinish(timer, ctx2D, canvas, block, setBlock, setWall, gameLevel) {
    clearInterval(timer)
    gameClearCanvas(ctx2D, canvas)
    blockStart(canvas, block, setBlock, gameLevel)
    wallStart(setWall)
}

function gameLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, setUpdateInfo, gameLevel) {
    if (ctx2D) {
        gameClearCanvas(ctx2D, canvas)
        blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, setUpdateInfo, gameLevel)
        wallLoop(ctx2D, wall, canvas.tileDim)
    }
    console.log("need to clear interval")
}

function gameClearCanvas(ctx2D, canvas) {
    if (ctx2D) {
        ctx2D.clearRect(0, 0, canvas.width, canvas.height)
    }
}

export function gameUpdateInfo(gameReducer, setGameState) {
    gameUpdateScore(gameReducer, setGameState)
    gameUpdateLevel(gameReducer, setGameState)
}

function gameUpdateScore(gameReducer, setGameState) {
    setGameState(actionType.gameScore, gameReducer.score + 1)
}

function gameUpdateLevel(gameReducer, setGameState) {
    let scoreLevel = Math.round(gameReducer.score + 1 / LEVEL_FACTOR) + 1
    if (scoreLevel > gameReducer.level) {
        setGameState(actionType.gameLevel, gameReducer.level + 1)
    }
}