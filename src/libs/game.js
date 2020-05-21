import { BLOCK_INITIAL_SPEED, blockMoveDirections } from '../globals.js'

export const block = {

    draw: function(ctx2D, position, tileDim) {
        ctx2D.beginPath()
        ctx2D.rect(position.x, position.y, tileDim, tileDim)
        ctx2D.fillStyle = "grba(0, 0, 255, 0.5)"
        ctx2D.fill()
        ctx2D.closePath()
    },

    finish: function(ctx2D, canvasWidth, canvasHeight, position, tileDim, timer) {
        clearInterval(timer)
        // game.clearCanvas(ctx2D, canvasWidth, canvasHeight)
        // TODO: correct collision
        this.draw(ctx2D, position, tileDim)
    },

    init: function(canvasWidth, setPostion, setSpeed, speedState) {
        setPostion({ x: canvasWidth / 2, y: 0})
        setSpeed(BLOCK_INITIAL_SPEED)
        speedState("SET_BLOCK_SPEED", BLOCK_INITIAL_SPEED)
    },

    moveSide: function(canvasWidth, moveDir, setPosition, position, tileDim, setSideMove, sideMove, timer, blockReducer) {
        // Movo block to left
        if (moveDir === blockMoveDirections.left) {
            if (position.x > 0) {
                setPosition({ x: position.x - tileDim, y: position.y })
                setSideMove(!sideMove)
                // Remove timer with old position reference
                clearInterval(timer)
            }
            blockReducer("SET_BLOCK_MOVE", blockMoveDirections.none)
        }
        // Move block to right
        else if (moveDir === blockMoveDirections.right) {
            if (position.x + tileDim < canvasWidth) {
                setPosition({ x: position.x + tileDim, y: position.y })
                setSideMove(!sideMove)
                // Remove timer with old position reference
                clearInterval(timer)
            }
            blockReducer("SET_BLOCK_MOVE", blockMoveDirections.none)
        }
    },

    moveDown: function(canvasHeight, setPosition, position, tileDim, speed, setNewBlock) {
        if (position.y < canvasHeight - tileDim) {
            setPosition({ x: position.x, y: position.y += speed })
        }
        // TODO: check for collision
        else {
            // setPosition({ x: position.x, y: canvasHeight - tileDim })
            setNewBlock(true)
        }
    }
}

export const game = {
    clearCanvas: function(ctx2D, canvasWidth, canvasHeight) {
        ctx2D.clearRect(0, 0, canvasWidth, canvasHeight)
    },

    draw: function(blocks, position, tileDim) {
        for (block in blocks) {
            ctx2D.beginPath()
            ctx2D.rect(position.x, position.y, tileDim, tileDim)
            ctx2D.fillStyle = "grba(0, 0, 255, 0.5)"
            ctx2D.fill()
            ctx2D.closePath()
        }
    }
}