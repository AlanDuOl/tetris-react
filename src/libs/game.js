import { TIMER_SPEED, actionType, BLOCK_NUM_TILES, WALL_TILES_HEIGHT, WALL_TILES_WIDTH } from '../globals.js'
import { Block } from './block.js'
import { Wall } from './wall.js'
import { Info } from './info.js'

export function Game(ctx2D, canvas, setGameState) {

    // Object consts
    this.timer = null
    this.ctx2D = ctx2D
    this.canvas = canvas
    this.setGameState = setGameState

    this.block = new Block()
    this.wall = new Wall()
    this.info = new Info()
    this.gameOver = false

    this.init = () => {
        this.resetState(this.setGameState)
        this.block.init(this.canvas)
        this.wall.init()
        this.info.init(this.setGameState)
    }

    this.resetState = () => {
        this.setGameState(actionType.gameOn, false)
        this.setGameState(actionType.gamePaused, false)
        this.setGameState(actionType.gameOver, false)
    }

    this.start = () => {
        this.setGameState(actionType.gameOn, true)
        this.setGameState(actionType.gamePaused, false)
        this.timer = setInterval(this.loop, TIMER_SPEED)
    }

    this.stop = () => {
        this.setGameState(actionType.gamePaused, true)
        clearInterval(this.timer)
    }

    this.finish = () => {
        this.stop(this.setGameState)
        this.clearCanvas()
        this.init(this.setGameState)
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

    this.update = () => {
        // Update block
        this.block.moveDown()
        // Check for collision block bottom collision with canvas and wall
        let collisionTiles = this.getBottomCollision()
        // Check if there was a block bottom collision
        // All other updates/checks are tiggered when block bottom collision happens
        if (collisionTiles.length === BLOCK_NUM_TILES) {
            // Update the wall
            let numRemovedRows = this.wall.update(collisionTiles, this.canvas.tileDim)
            // If a row was removed the info should be updated (score) and checked to update (level, record)
            if (numRemovedRows > 0) {
                this.info.update(numRemovedRows, this.setGameState)
            }
            // Check game over after wall update
            this.checkGameOver()
            // If the game is not over reset the block
            this.block.reset(this.canvas, this.info.level)
        }
    }

    this.getBottomCollision = () => {
        try {
            let collisionTiles = []
            this.block.tiles.forEach(currentTile => {
                // Check if it calls after return
                loop1:
                for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
                    for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                        // If there was a collision, add the tiles to the wall and return true
                        if ((currentTile.x === this.wall.tiles[row][col].x && currentTile.y + this.canvas.tileDim > this.wall.tiles[row][col].y &&
                            currentTile.y + this.canvas.tileDim < this.wall.tiles[row][col].y + this.canvas.tileDim * 2) || currentTile.y + this.canvas.tileDim > this.canvas.height) {
                            collisionTiles = this.block.tiles.slice()
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

    this.checkGameOver = () => {
        try {
            for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
                for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                    if (Object.keys(this.wall.tiles[row][col]).length === 2) {
                        // If there is a tile in the wall with y position < 0 the game is over
                        if (this.wall.tiles[row][col].y < 0) {
                            this.gameOver = true
                            this.setGameState(actionType.gameOver, true)
                        }
                    }
                }
            }
        }
        catch (e) {
            console.error(e.message)
        }
    }

    this.clearCanvas = () => {
        if (this.ctx2D) {
            this.ctx2D.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

}