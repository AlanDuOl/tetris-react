import { BLOCK_INITIAL_SPEED, BLOCK_DELTA_SPEED, blockMoveDirection, actionType, blockType, NUM_TILES_WIDTH } from '../globals.js'


export function blockStart(canvas, setBlockState) {
    setBlockState(actionType.blockPosition, { x: canvas.width / 2, y: - canvas.width / NUM_TILES_WIDTH})
    setBlockState(actionType.blockSpeed, BLOCK_INITIAL_SPEED)
    setBlockState(actionType.blockType, getBlockType())
}

export function blockDraw(ctx2D, currentBlock, tileDim) {
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

export function blockMoveSide(canvas, setSideMove, currentBlock, setBlockState) {
        // Movo block to left
        if (currentBlock.moveDir === blockMoveDirection.left) {
            if (currentBlock.position.x > 0) {
                setBlockState(actionType.blockPosition, { x: currentBlock.position.x - canvas.tileDim, y: currentBlock.position.y })
                setSideMove(true)
            }
            setBlockState(actionType.blockMove, blockMoveDirection.none)
        }
        // Move block to right
        else if (currentBlock.moveDir === blockMoveDirection.right) {
            if (currentBlock.position.x + canvas.tileDim < canvas.width) {
                setBlockState(actionType.blockPosition, { x: currentBlock.position.x + canvas.tileDim, y: currentBlock.position.y })
                setSideMove(true)
            }
            setBlockState(actionType.blockMove, blockMoveDirection.none)
        }
}

export function blockMoveDown(canvas, setBlockState, currentBlock, timer) {
        if (currentBlock.position.y < canvas.height - canvas.tileDim) {
            setBlockState(actionType.blockPosition, { x: currentBlock.position.x, y: currentBlock.position.y += currentBlock.speed })
        }
        // TODO: check for collision
        else {
            // TODO:
            // - get block info to update wall
            // - set block position and speed to initial
            // - update game
        }
}

export function blockNewSpeed(currentSpeed) {
    let newSpeed = currentSpeed + BLOCK_DELTA_SPEED
    return newSpeed
}

export function blockSpeedUp(setSpeedChange) {
    setSpeedChange(true)
}

function getBlockType() {

    let type = ""
    let blockNumber = getBlockNumber()

    // Return the blockType that is going to be used as a css class to define the block layout
    switch(blockNumber) {
        case 1:
            type = blockType.I
            return type
        case 2:
            type = blockType.S
            return type
        case 3:
            type = blockType.Z
            return type
        case 4:
            type = blockType.T
            return type
        case 5:
            type = blockType.L
            return type
        case 6:
            type = blockType.J
            return type
        case 7:
            type = blockType.O
            return type
        default:
            console.log("Unknown block number: " + blockNumber)
            break
    }
}

// Return the block number used to define the block type
function getBlockNumber() {
    const min = 1, max = 7
    let blockNum = Math.round(Math.random() * (max - min)) + min
    return blockNum
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
