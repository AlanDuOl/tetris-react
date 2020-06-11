import { blockLoop, blockInit } from './block.js'
import { wallLoop, wallInit } from './wall.js'
import { TIMER_SPEED, LEVEL_FACTOR, actionType, GAME_INITIAL_LEVEL, GAME_INITIAL_SCORE } from '../globals.js'

export function gameInit(canvasDims, setWall, setBlock) {
    blockInit(canvasDims, setBlock)
    wallInit(setWall)
}

export async function gameInfoInit(setGameState) {
    let record = await gameRecordGet()
    setGameState(actionType.gameRecord, record)
    setGameState(actionType.gameLevel, GAME_INITIAL_LEVEL)
    setGameState(actionType.gameScore, GAME_INITIAL_SCORE)
}

export function gameInfoUpdate(score, level, record, setGameState) {
    // Score is updated directly when a wall line is removed
    // Changes in score tigger updates in record and level
    gameLevelUpdate(score, level, setGameState)
    gameRecordUpdate(score, record, setGameState)
}

export function gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState) {
    setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState), TIMER_SPEED))
}

export function gamePause(timer) {
    clearInterval(timer)
}

export function gameFinish(timer, ctx2D, canvas, setBlock, setWall, setGameState) {
    clearInterval(timer)
    gameCanvasClear(ctx2D, canvas)
    gameInfoInit(setGameState)
    blockInit(canvas, setBlock)
    wallInit(setWall)
}

function gameLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, gameReducer, setGameState) {
    if (ctx2D) {
        gameCanvasClear(ctx2D, canvas)
        blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, gameReducer, setGameState)
        wallLoop(ctx2D, wall, canvas.tileDim)
    }
    console.log("need to clear interval")
}

function gameCanvasClear(ctx2D, canvas) {
    if (ctx2D) {
        ctx2D.clearRect(0, 0, canvas.width, canvas.height)
    }
}

async function gameRecordGet() {
    const url = 'http://localhost:4000/record/get'
    const response = await fetch(url)
    const data = await response.json()
    if (data[0].id || data[0].id === 0) {
        return data[0].value
    }
    else {
        console.error("No record data")
    }
}

function gameRecordSave(newRecord) {
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

function gameRecordUpdate(score, record, setGameState) {
    if (score > 0 && score > record) {
        setGameState(actionType.gameRecord, score)
        gameRecordSave(score)
    }
}

function gameLevelUpdate(score, level, setGameState) {
    let futureLevel = Math.round(score / LEVEL_FACTOR) + 1
    if (futureLevel > level) {
        setGameState(actionType.gameLevel, level + 1)
    }
}