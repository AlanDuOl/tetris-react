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

export async function gameGetRecord() {
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


export function gameInitInfo(setGameState) {
    let record = gameGetRecord()
    setGameState(actionType.gameRecord, record)
    setGameState(actionType.gameLevel, GAME_INITIAL_LEVEL)
    setGameState(actionType.gameScore, GAME_INITIAL_SCORE)
}

export function gameUpdateInfo(score, setScore, level, setLevel, record, setRecord, setGameState) {
    gameUpdateScore(score, setScore)
    gameUpdateLevel(score, level, setLevel, setGameState)
    gameUpdateRecord(score, record, setRecord, setGameState)
}

function gameUpdateScore(score, setScore) {
    if (score > 0) {
        setScore(score)
    }
}

function gameUpdateRecord(score, record, setRecord, setGameState) {
    if (score > record) {
        setRecord(score)
        setGameState(actionType.gameRecord, score)
    }
}

function gameUpdateLevel(score, level, setLevel, setGameState) {
    let futureLevel = Math.round(score / LEVEL_FACTOR) + 1
    if (futureLevel > level) {
        setLevel(level + 1)
        setGameState(actionType.gameLevel, level + 1)
    }
}