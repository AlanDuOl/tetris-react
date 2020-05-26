import {
    BLOCK_INITIAL_SPEED, BLOCK_DELTA_SPEED, blockMoveDirection, actionType, blockType, BLOCK_DELTA_ROTATION, BLOCK_INITIAL_ROTATION
} from '../globals.js'
import { wallSetTiles } from './wall.js'


export function blockStart(block, setBlock, blockInitialPos, tileDim) {
    let newBlock = block
    let type = blockGetType()
    let tiles = blockSetTiles(blockInitialPos, type, tileDim)
    newBlock.position = blockInitialPos
    newBlock.initialPos = blockInitialPos
    newBlock.speed = BLOCK_INITIAL_SPEED
    newBlock.rotationAngle = BLOCK_INITIAL_ROTATION
    newBlock.type = type
    newBlock.tiles = [tiles.tile1, tiles.tile2, tiles.tile3, tiles.tile4]
    setBlock(newBlock)
}

export function blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock) {
    blockDraw(ctx2D, currentBlock, canvas.tileDim)
    blockCheckBottomCollision(canvas, wall, setWall, currentBlock, setBlock)
    blockMoveDown(currentBlock, setBlock)
}

function blockDraw(ctx2D, currentBlock, tileDim) {
    if (ctx2D) {
        // ctx2D.save()
        blockDrawShape(ctx2D, currentBlock, tileDim)
        // ctx2D.restore()
    }
}

function blockMoveDown(currentBlock, setBlock) {
    let newBlock = currentBlock
    newBlock.tiles.forEach(currentTile => {
        currentTile.y += newBlock.speed
    })
    setBlock(newBlock)
}

function blockCheckBottomCollision(canvas, wall, setWall, currentBlock, setBlock) {
    try {
        currentBlock.tiles.forEach(currentTile => {
            for (let row = 0; row < wall.length; row++) {
                for (let col = 0; col < wall[0].length; col++) {
                    if ((currentTile.x === wall[row][col].x && currentTile.y + canvas.tileDim > wall[row][col].y &&
                        currentTile.y + canvas.tileDim < wall[row][col].y + canvas.tileDim * 2) || currentTile.y + canvas.tileDim > canvas.height) {
                        wallSetTiles(currentBlock.tiles, wall, setWall, canvas.tileDim)
                        blockReset(currentBlock, setBlock, canvas.tileDim)
                        return
                    }
                }
            }
        })
    }
    catch (e) {
        console.log(e.message)
    }
}

export function blockMove(canvas, currentBlock, setBlock, setBlockState, moveDir) {
    // Movo block to left
    try {
        if (moveDir === blockMoveDirection.left) {
            let newBlock = currentBlock
            if (newBlock.tiles[0].x > 0 && newBlock.tiles[1].x > 0 && newBlock.tiles[2].x > 0 && newBlock.tiles[3].x > 0) {
                newBlock.tiles.forEach(currentTile => {
                    currentTile.x -= canvas.tileDim
                })
                setBlock(newBlock)
            }
        }
        // Move block to right
        else if (moveDir === blockMoveDirection.right) {
            let newBlock = currentBlock
            if (newBlock.tiles[0].x + canvas.tileDim < canvas.width && newBlock.tiles[1].x + canvas.tileDim < canvas.width && newBlock.tiles[2].x + canvas.tileDim < canvas.width && newBlock.tiles[3].x + canvas.tileDim < canvas.width) {
                newBlock.tiles.forEach(currentTile => {
                    currentTile.x += canvas.tileDim
                })
                setBlock(newBlock)
            }
        }
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        setBlockState(actionType.blockMove, blockMoveDirection.none)
    }
}

export function blockNewSpeed(currentBlock, setBlock) {
    let newBlock = currentBlock
    newBlock.speed += BLOCK_DELTA_SPEED
    setBlock(newBlock)
}

export function blockRotate(currentBlock, setBlock) {
    if (currentBlock.type.name !== "O") {
        let newBlock = currentBlock
        newBlock.tiles = blockGetRotateTiles(currentBlock.tiles, BLOCK_DELTA_ROTATION)
        setBlock(newBlock)
    }
}

export function blockReset(currentBlock, setBlock, tileDim) {
    let newBlock = currentBlock
    let type = blockGetType()
    let tiles = blockSetTiles(newBlock.initialPos, type, tileDim)
    newBlock.position = newBlock.initialPos
    newBlock.speed = BLOCK_INITIAL_SPEED
    newBlock.type = type
    newBlock.tiles = [tiles.tile1, tiles.tile2, tiles.tile3, tiles.tile4]
    setBlock(newBlock)
}

function blockDrawShape(ctx2D, currentBlock, tileDim) {
    try {
        ctx2D.fillStyle = currentBlock.type.fillStyle
        ctx2D.beginPath()
        currentBlock.tiles.forEach(tile => {
            ctx2D.rect(tile.x, tile.y, tileDim, tileDim)
        })
        ctx2D.fill()
    }
    catch (e) {
        console.log(e.message)
    }
}

function blockGetRotateTiles(tiles, rotationAngle) {
    let newTiles = []
    try {
        let centerTile = tiles[2]
        let angle = (Math.PI / 180) * rotationAngle
        tiles.forEach(tile => {
            let newTile = {}
            newTile.x = Math.cos(angle) * (tile.x - centerTile.x) - Math.sin(angle) * (tile.y - centerTile.y) + centerTile.x
            newTile.y = Math.sin(angle) * (tile.x - centerTile.x) - Math.cos(angle) * (tile.y - centerTile.y) + centerTile.y
            newTiles.push(newTile)
        })
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        return newTiles
    }
}

function blockSetTiles(blockInitialPos, type, tileDim) {
    let tiles = null
    switch (type.name) {
        case blockType.I.name:
            tiles = blockSetI(blockInitialPos, tileDim)
            return tiles
        case blockType.S.name:
            tiles = blockSetS(blockInitialPos, tileDim)
            return tiles
        case blockType.Z.name:
            tiles = blockSetZ(blockInitialPos, tileDim)
            return tiles
        case blockType.T.name:
            tiles = blockSetT(blockInitialPos, tileDim)
            return tiles
        case blockType.L.name:
            tiles = blockSetL(blockInitialPos, tileDim)
            return tiles
        case blockType.J.name:
            tiles = blockSetJ(blockInitialPos, tileDim)
            return tiles
        case blockType.O.name:
            tiles = blockSetO(blockInitialPos, tileDim)
            return tiles
        default:
            console.log("Unknown block...")
            break
    }
}

function blockSetI(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y },
        tile2: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim },
        tile3: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim * 2 },
        tile4: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim * 3 }
    }
    return tiles
}
function blockSetS(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim },
        tile2: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y },
        tile3: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim },
        tile4: { x: blockInitialPos.x + tileDim * 2, y: blockInitialPos.y }
    }
    return tiles
}
function blockSetZ(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y },
        tile2: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y },
        tile3: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim },
        tile4: { x: blockInitialPos.x + tileDim * 2, y: blockInitialPos.y + tileDim }
    }
    return tiles
}
function blockSetT(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y },
        tile2: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y },
        tile3: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim },
        tile4: { x: blockInitialPos.x + tileDim * 2, y: blockInitialPos.y }
    }
    return tiles
}
function blockSetL(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y },
        tile2: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim },
        tile3: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim * 2 },
        tile4: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim * 2 }
    }
    return tiles
}
function blockSetJ(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim * 2 },
        tile2: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y },
        tile3: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim * 2 },
        tile4: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim }
    }
    return tiles
}
function blockSetO(blockInitialPos, tileDim) {
    let tiles = {
        tile1: { x: blockInitialPos.x, y: blockInitialPos.y },
        tile2: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y },
        tile3: { x: blockInitialPos.x + tileDim, y: blockInitialPos.y + tileDim },
        tile4: { x: blockInitialPos.x, y: blockInitialPos.y + tileDim }
    }
    return tiles
}

function blockGetType() {

    let type = ""
    let blockNumber = blockGetNumber()

    // Return the blockType that is going to be used as a css class to define the block layout
    switch (blockNumber) {
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
            return type
    }
}

// Return the block number used to define the block type
function blockGetNumber() {
    const min = 1, max = 7
    let blockNum = Math.round(Math.random() * (max - min)) + min
    return blockNum
}

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
