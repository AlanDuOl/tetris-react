import { BLOCK_INITIAL_SPEED, blockMoveDirection, actionType } from '../globals.js'


export function start(canvas, setBlockState) {
        setBlockState(actionType.blockPosition, { x: canvas.width / 2, y: 0})
        setBlockState(actionType.blockSpeed, BLOCK_INITIAL_SPEED)
}

export function draw(ctx2D, currentBlock, tileDim) {
        if (ctx2D) {
            ctx2D.beginPath()
            ctx2D.rect(currentBlock.position.x, currentBlock.position.y, tileDim, tileDim)
            ctx2D.fillStyle = "grba(0, 0, 255, 0.5)"
            ctx2D.fill()
            ctx2D.closePath()
        }
}

export function finish(ctx2D, canvasWidth, canvasHeight, position, tileDim, timer) {
        clearInterval(timer)
        // game.clearCanvas(ctx2D, canvasWidth, canvasHeight)
        // TODO: correct collision
        this.draw(ctx2D, position, tileDim)
}

export function moveSide(canvasWidth, moveDir, setPosition, position, tileDim, setSideMove, sideMove, timer, blockReducer) {
        // Movo block to left
        if (moveDir === blockMoveDirection.left) {
            if (position.x > 0) {
                setPosition({ x: position.x - tileDim, y: position.y })
                setSideMove(!sideMove)
                // Remove timer with old position reference
                clearInterval(timer)
            }
            blockReducer("SET_BLOCK_MOVE", blockMoveDirection.none)
        }
        // Move block to right
        else if (moveDir === blockMoveDirection.right) {
            if (position.x + tileDim < canvasWidth) {
                setPosition({ x: position.x + tileDim, y: position.y })
                setSideMove(!sideMove)
                // Remove timer with old position reference
                clearInterval(timer)
            }
            blockReducer("SET_BLOCK_MOVE", blockMoveDirection.none)
        }
}

export function moveDown(canvasHeight, setPosition, position, tileDim, speed, setNewBlock) {
        if (position.y < canvasHeight - tileDim) {
            setPosition({ x: position.x, y: position.y += speed })
        }
        // TODO: check for collision
        else {
            // setPosition({ x: position.x, y: canvasHeight - tileDim })
            setNewBlock(true)
        }
}



// export const setBlockInitialPosition = (block, viewportWidth, viewportHeight) => {
//     if (block) {
//         let tileWidth = viewportWidth / NUM_TILES_WIDTH
//         block.style.left = `${tileWidth * NUM_TILES_WIDTH / 2}px`
//         block.style.bottom = `${viewportHeight}px`
//     }
// }

// export const blockMove = (moveDirection, block, viewportWidth) => {
//     switch (moveDirection) {
//         case blockMoveDirection.left:
//             blockMoveLeft(block, viewportWidth)
//             break
//         case blockMoveDirections.right:
//             blockMoveRight(block, viewportWidth)
//             break
//         default:
//             console.log("Unknown move direction")
//             break
//     }
// }

// const blockMoveLeft = (block, viewportWidth) => {
//     if (block) {
//         let tileWidth = parseFloat(viewportWidth / NUM_TILES_WIDTH)
//         let blockNewLeft = parseFloat(block.style.left) - tileWidth
//         if (blockNewLeft > 0) {
//             block.style.left = `${parseFloat(block.style.left) - tileWidth}px`
//         }
//     }
// }

// const blockMoveRight = (block, viewportWidth) => {
//     if (block) {
//         let blockRect = block.getBoundingClientRect()
//         let tileWidth = parseFloat(viewportWidth / NUM_TILES_WIDTH)
//         let blockCurrentRight = parseFloat(block.style.left) + blockRect.width
//         let blockNewRight = blockCurrentRight + tileWidth
//         if (blockNewRight < viewportWidth) {
//             block.style.left = `${parseFloat(block.style.left) + tileWidth}px`
//         }
//     }
// }

// export const blockNewRotation = currentRotation => {
//     let rotation = currentRotation
//     if (currentRotation >= 270) {
//         rotation = 0
//     }
//     else {
//         rotation += BLOCK_DELTA_ROTATION
//     }
//     return rotation
// }

// // TODO: On I block collition does not work
// export const checkRotationCollision = (block, viewportWidth) => {

//     if (block) {

//         let tileWidth = parseFloat(viewportWidth / NUM_TILES_WIDTH)
//         // Float precision dimensions
//         let blockRect = block.getBoundingClientRect()
//         // Block current right ad left positions
//         let blockCurrentRight = parseFloat(block.style.left) + blockRect.width
//         let blockCurrentLeft = parseFloat(block.style.left)

//         // Check if there is an overflow
//         if (blockCurrentRight > viewportWidth) {
//             // if the difference is more than 2 tiles
//             if (blockCurrentRight > (viewportWidth + tileWidth * 2)) {
//                 block.style.left = `${viewportWidth - tileWidth * 4.0}px`
//             }
//             // if the difference is more than 1 tile
//             else if (blockCurrentRight > (viewportWidth + tileWidth)) {
//                 block.style.left = `${parseFloat(block.style.left) - tileWidth * 2.0}px`
//             }
//             // All others
//             else {
//                 block.style.left = `${parseFloat(block.style.left) - tileWidth}px`
//             }
//         }
//         // This is problably not necessary because only left overflow is happening
//         else if (blockCurrentLeft < 0) {
//             if (blockCurrentLeft < -tileWidth) {
//                 block.style.left = `${parseFloat(block.style.left) + tileWidth * 2}px`
//             }
//             else {
//                 block.style.left = `${parseFloat(block.style.left) + tileWidth}px`
//             }
//         }
//     }
// }

// export function blockNewSpeed(currentSpeed) {
//     let newSpeed = currentSpeed + BLOCK_DELTA_SPEED
//     return newSpeed
// }

// export function getTimerSpeed(gameLevel) {
//     switch (gameLevel) {
//         case 1:
//             return timerSpeeds.level1
//         case 2:
//             return timerSpeeds.level2
//         case 3:
//             return timerSpeeds.level3
//         case 4:
//             return timerSpeeds.level4
//         default:
//             return timerSpeeds.speedUp
//     }
// }

// function getBlockType() {

//     let blockType = ""
//     let blockNumber = getBlockNumber()

//     // Return the blockType that is going to be used as a css class to define the block layout
//     switch(blockNumber) {
//         case 1:
//             blockType = blockTypes.one.name
//             return blockType
//         case 2:
//             blockType = blockTypes.two.name
//             return blockType
//         case 3:
//             blockType = blockTypes.three.name
//             return blockType
//         case 4:
//             blockType = blockTypes.four.name
//             return blockType
//         case 5:
//             blockType = blockTypes.five.name
//             return blockType
//         case 6:
//             blockType = blockTypes.six.name
//             return blockType
//         case 7:
//             blockType = blockTypes.seven.name
//             return blockType
//         default:
//             console.log("Unknown block number: " + blockNumber)
//             break
//     }
// }

// // Return the block number used to define the block type
// function getBlockNumber() {
//     const min = 1, max = 6
//     let blockNum = Math.round(Math.random() * max) + min
//     return blockNum
// }
