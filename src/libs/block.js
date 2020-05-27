import {
    BLOCK_INITIAL_SPEED, BLOCK_DELTA_SPEED, blockMoveDirection, actionType, blockType, BLOCK_DELTA_ROTATION, BLOCK_INITIAL_ROTATION
} from '../globals.js'
import { wallSetTiles } from './wall.js'


export function blockStart(canvas, block, setBlock) {
    let newBlock = block
    let blockType = blockGetType()
    newBlock.speed = BLOCK_INITIAL_SPEED
    newBlock.rotationAngle = BLOCK_INITIAL_ROTATION
    newBlock.type = blockType
    newBlock.tiles = blockSetTiles(canvas, blockType)
    setBlock(newBlock)
}

export function blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock) {
    blockDraw(ctx2D, currentBlock, canvas.tileDim)
    blockCheckBottomCollision(canvas, wall, setWall, currentBlock, setBlock)
    blockMoveDown(currentBlock, setBlock)
}

function blockDraw(ctx2D, currentBlock, tileDim) {
    if (ctx2D) {
        blockDrawShape(ctx2D, currentBlock, tileDim)
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
        let collision = false
        currentBlock.tiles.forEach(currentTile => {
            if (!collision) {
                loop1:
                for (let row = 0; row < wall.length; row++) {
                    for (let col = 0; col < wall[0].length; col++) {
                        if ((currentTile.x === wall[row][col].x && currentTile.y + canvas.tileDim > wall[row][col].y &&
                            currentTile.y + canvas.tileDim < wall[row][col].y + canvas.tileDim * 2) || currentTile.y + canvas.tileDim > canvas.height) {
                            wallSetTiles(currentBlock.tiles, wall, setWall, canvas.tileDim)
                            blockReset(canvas, currentBlock, setBlock)
                            collision = true
                            break loop1
                        }
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

export function blockReset(canvas, currentBlock, setBlock) {
    let newBlock = currentBlock
    let type = blockGetType()
    newBlock.speed = BLOCK_INITIAL_SPEED
    newBlock.type = type
    newBlock.tiles = blockSetTiles(canvas, type)
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

function blockSetTiles(canvas, type) {
    let tiles = null
    switch (type.name) {
        case blockType.I.name:
            tiles = blockSetI(canvas)
            return tiles
        case blockType.S.name:
            tiles = blockSetS(canvas)
            return tiles
        case blockType.Z.name:
            tiles = blockSetZ(canvas)
            return tiles
        case blockType.T.name:
            tiles = blockSetT(canvas)
            return tiles
        case blockType.L.name:
            tiles = blockSetL(canvas)
            return tiles
        case blockType.J.name:
            tiles = blockSetJ(canvas)
            return tiles
        case blockType.O.name:
            tiles = blockSetO(canvas)
            return tiles
        default:
            console.log("Unknown block...")
            break
    }
}

function blockSetI(canvas) {
    let leftMostX = canvas.width / 2
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 4 })
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX, y: - canvas.tileDim })
    return tiles
}
function blockSetS(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    tiles.push({ x: leftMostX + canvas.tileDim * 2, y: - canvas.tileDim * 2 })
    return tiles
}
function blockSetZ(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    tiles.push({ x: leftMostX + canvas.tileDim * 2, y: - canvas.tileDim })
    return tiles
}
function blockSetT(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    tiles.push({ x: leftMostX + canvas.tileDim * 2, y: - canvas.tileDim * 2 })
    return tiles
}
function blockSetL(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    tiles.push({ x: leftMostX, y: - canvas.tileDim })
    return tiles
}
function blockSetJ(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 3 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    return tiles
}
function blockSetO(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let tiles = []
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    tiles.push({ x: leftMostX, y: - canvas.tileDim * 1 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 1 })
    tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
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
