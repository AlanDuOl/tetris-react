import { TIMER_SPEED, actionType, BLOCK_NUM_TILES, WALL_TILES_HEIGHT, WALL_TILES_WIDTH } from '../globals.js'
import { Block } from './block.js'
import { Wall } from './wall.js'
import { Info } from './info.js'

export function Game(ctx2D, canvas, setGameState) {

    // Object consts
    this.setGameState = setGameState
    this.timer = null
    this.ctx2D = ctx2D
    this.canvas = canvas

    this.block = new Block()
    this.wall = new Wall()
    this.info = new Info()
    this.gameOver = false

    this.init = () => {
        this.resetState()
        this.block.init(canvas)
        this.wall.init()
        this.info.init()
    }

    this.resetState = () => {
        this.setGameState(actionType.gameOn, false)
        this.setGameState(actionType.gamePaused, false)
        this.setGameState(actionType.gameOver, false)
    }

    this.start = () => {
        this.setGameState(actionType.gameOn, true)
        this.timer = setInterval(this.loop, TIMER_SPEED)
    }

    this.stop = () => {
        this.setGameState(actionType.gamePaused, true)
        clearInterval(this.timer)
    }

    this.finish = () => {
        this.stop()
        this.clearCanvas()
        this.init()
    }

    this.loop = () => {
        this.update()
        this.draw()
        console.log("need to clear interval")
    }

    this.draw = () => {
        if (this.ctx2D) {
            // Clear canvas
            this.clearCanvas()
            // Draw block
            this.block.draw(this.ctx2D, this.canvas.tileDim)
            // Draw wall
            this.wall.draw(this.ctx2D, this.canvas.tileDim)
        }
    }

    this.update = (canvas, wall, setWall, block, setBlock, gameReducer, setGameState) => {
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
            gameCheckGameOver(wall, setGameState)
            // If the game is not over reset the block
            blockReset(canvas, block, setBlock, gameReducer)
        }
    }

    this.getBottomCollision = (block, wall, canvas) => {
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

    this.checkGameOver = (wall, setGameState) => {
        try {
            for (let row = 0; row < wall.length; row++) {
                for (let col = 0; col < wall[0].length; col++) {
                    if (Object.keys(wall[row][col]).length === 2) {
                        // If there is a tile in the wall with y position < 0 the game is over
                        if (wall[row][col].y < 0) {
                            // setGameState(actionType.gameOver, true)
                        }
                    }
                }
            }
        }
        catch (e) {
            console.error(e.message)
        }
    }

    this.clearCanvas = (ctx2D, canvas) => {
        if (ctx2D) {
            ctx2D.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

}