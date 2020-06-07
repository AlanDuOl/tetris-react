import { blockLoop, blockStart } from './block.js'
import { wallStart, wallLoop } from './wall.js'
import { TIMER_SPEED, LEVEL_FACTOR, actionType, GAME_INITIAL_LEVEL, GAME_INITIAL_SCORE } from '../globals.js'

export function gameInit(canvasDims, setWall, block, setBlock) {
    blockStart(canvasDims, block, setBlock)
    wallStart(setWall)
}

export function gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState) {
    setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState), TIMER_SPEED))
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

function gameLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, gameReducer, setGameState) {
    if (ctx2D) {
        gameClearCanvas(ctx2D, canvas)
        blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, gameReducer, setGameState)
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

export function gameUpdateInfo(gameReducer, setGameState) {
    gameUpdateLevel(gameReducer, setGameState)
    gameUpdateRecord(gameReducer, setGameState)
}

export async function gameGetRecord(setRecord, setGameState) {
    const url = 'http://localhost:4000/record/get'
    const response = await fetch(url)
    const data = await response.json()
    if (data[0].id) {
        setRecord(data[0].value)
        setGameState(actionType.gameRecord, data[0].value)
    }
    else {
        console.error("No record data value")
    }
}

export function gameSaveRecord(newRecord) {
    const data = { id: 1, record: newRecord }
    const url = 'http://localhost:4000/record/update'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
    })
    .catch(err => console.error(err))
}

function gameUpdateRecord(gameReducer, setGameState) {
    if (gameReducer.score > gameReducer.record) {
        setGameState(actionType.gameRecord, gameReducer.score)
    }
}

function gameUpdateLevel(gameReducer, setGameState) {
    let scoreLevel = Math.round(gameReducer.score / LEVEL_FACTOR) + 1
    if (scoreLevel > gameReducer.level) {
        setGameState(actionType.gameLevel, gameReducer.level + 1)
    }
}