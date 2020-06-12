import { TIMER_SPEED, actionType, BLOCK_NUM_TILES, WALL_TILES_HEIGHT, WALL_TILES_WIDTH } from '../globals.js'
import { blockMoveDown, blockInit, blockDraw, blockReset } from './block.js'
import { wallInit, wallDraw, wallUpdate } from './wall.js'
import { infoInit, infoUpdate } from './info.js'

export function gameInit(canvasDims, setWall, setBlock, setGameState) {
    setGameState(actionType.gameOn, false)
    setGameState(actionType.gamePaused, false)
    setGameState(actionType.gameOver, false)
    blockInit(canvasDims, setBlock)
    wallInit(setWall)
    infoInit(setGameState)
}

export function gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState) {
    setGameState(actionType.gameOn, true)
    setGameState(actionType.gamePaused, false)
    setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState), TIMER_SPEED))
}

export function gameStop(timer, setGameState) {
    setGameState(actionType.gamePaused, true)
    clearInterval(timer)
}

export function gameFinish(timer, ctx2D, canvas, setBlock, setWall, setGameState) {
    gameStop(timer, setGameState)
    gameCanvasClear(ctx2D, canvas)
    gameInit(canvas, setWall, setBlock, setGameState)
}

function gameLoop(ctx2D, canvas, wall, setWall, block, setBlock, gameReducer, setGameState) {
    // If the game is not over, run it
    if (!gameReducer.gameOver) {
        gameUpdate(canvas, wall, setWall, block, setBlock, gameReducer, setGameState)
        gameDraw(ctx2D, block, wall, canvas)
    }
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
    blockMoveDown(block, setBlock)
    // Check for collision block bottom collision with canvas and wall
    let collisionTiles = gameGetBottomCollision(block, wall, canvas)
    // Check if there was a block bottom collision
    // All other updates/checks are tiggered when block bottom collision happens
    if (collisionTiles.length === BLOCK_NUM_TILES) {
        // Update the wall
        let numRemovedRows = wallUpdate(collisionTiles, wall, setWall, canvas.tileDim)
        // If a row was removed the info should be updated (score) and checked to update (level, record)
        if (numRemovedRows > 0) {
            infoUpdate(numRemovedRows, gameReducer, setGameState)
        }
        // Check game over after wall update
        let gameOver = gameCheckGameOver(wall, setGameState)
        // If the game is not over reset the block
        if (!gameOver) {
            blockReset(canvas, block, setBlock, gameReducer)
        }
    }
}

function gameGetBottomCollision(block, wall, canvas) {
    try {
        let collisionTiles = []
        block.tiles.forEach(currentTile => {
                // Check if it calls after return
                loop1:
                for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
                    for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                        // If there was a collision, add the tiles to the wall and return true
                        if ((currentTile.x === wall[row][col].x && currentTile.y + canvas.tileDim > wall[row][col].y &&
                            currentTile.y + canvas.tileDim < wall[row][col].y + canvas.tileDim * 2) || currentTile.y + canvas.tileDim > canvas.height) {
                            collisionTiles = block.tiles.slice()
                            break loop1
                        }
                    }
                }
        })
        return collisionTiles
    }
    catch (e) {
        console.error(e.message)
    }
}

function gameCheckGameOver(wall, setGameState) {
    let gameOver = false
    try {
        for (let row = 0; row < wall.length; row++) {
            for (let col = 0; col < wall[0].length; col++) {
                if (Object.keys(wall[row][col]).length === 2) {
                    // If there is a tile in the wall with y position < 0 the game is over
                    if (wall[row][col].y < 0) {
                        gameOver = true
                        setGameState(actionType.gameOver, true)
                    }
                }
            }
        }
    }
    catch (e) {
        console.error(e.message)
    }
    return gameOver
}

function gameCanvasClear(ctx2D, canvas) {
    if (ctx2D) {
        ctx2D.clearRect(0, 0, canvas.width, canvas.height)
    }
}