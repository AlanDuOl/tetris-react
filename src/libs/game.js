import { blockUpdate, blockInit, blockDraw, blockReset } from './block.js'
import { wallInit, wallDraw, wallUpdate } from './wall.js'
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

function gameLoop(ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState) {
    gameDraw(ctx2D, block, wall, canvas)
    gameUpdate(canvas, wall, setWall, block, setBlock, gameReducer, setGameState)
    console.log("need to clear interval")
}

function gameDraw(ctx2D, block, wall, canvas) {
    if (ctx2D) {
        // Clear canvas
        gameCanvasClear(ctx2D, canvas)
        // Draw block
        blockDraw(ctx2D, block, canvas.tileDim)
        // Draw wall
        wallDraw(ctx2D, wall, canvas.tileDim)
    }
}

function gameUpdate(canvas, wall, setWall, block, setBlock, gameReducer, setGameState) {
    // Update block
    let blockCollided = blockUpdate(canvas, wall, setWall, block, setBlock, gameReducer)
    let numRemovedRows = 0
    // Wall update is tiggered by block bottom collision happens
    if (blockCollided) {
        numRemovedRows = wallUpdate(wall, canvas.tileDim, numRemovedRows)
        // If a row was removed the info should be updated (score, level, record)
        if (numRemovedRows > 0) {
            // infoUpdate()
        }
        gameCheckGameOver(wall, setGameState)
        blockReset(canvas, block, setBlock, gameReducer)
    }
}

function gameCheckGameOver(wall, setGameState) {
    try {
        for (let row = 0; row < wall.length; row++) {
            for (let col = 0; col < wall[0].length; col++) {
                if (Object.keys(wall[row][col]).length === 2) {
                    // If there is a tile in the wall with y position < 0 the game is over
                    if (wall[row][col].y < 0) {
                        setGameState(actionType.gameOver, true)
                        console.log("gameover")
                    }
                }
            }
        }
    }
    catch (e) {
        console.error(e.message)
    }
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