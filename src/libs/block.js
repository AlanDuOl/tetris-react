import {
    BLOCK_INITIAL_SPEED, BLOCK_DELTA_SPEED, blockMoveDirection, actionType, blockType, BLOCK_DELTA_ROTATION, BLOCK_INITIAL_ROTATION,
    NUM_TILES_WIDTH, NUM_TILES_HEIGHT
} from '../globals.js'
import { wallSetTiles } from './wall.js'


export function blockStart(canvas, block, setBlock) {
    let newBlock = block
    newBlock.speed = BLOCK_INITIAL_SPEED
    newBlock.rotationAngle = BLOCK_INITIAL_ROTATION
    newBlock.type = blockGetType()
    let tempBlock = blockSetTiles(canvas, newBlock.type)
    newBlock.tiles = tempBlock.tiles
    newBlock.rotationPoint = tempBlock.rotationPoint
    setBlock(newBlock)
}

export function blockLoop(ctx2D, canvas, wall, setWall, block, setBlock) {
    blockDraw(ctx2D, block, canvas.tileDim)
    blockCheckBottomCollision(canvas, wall, setWall, block, setBlock)
    blockMoveDown(block, setBlock)
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
    newBlock.rotationPoint.y += newBlock.speed
    setBlock(newBlock)
}

function blockCheckBottomCollision(canvas, wall, setWall, currentBlock, setBlock) {
    try {
        let collision = false
        currentBlock.tiles.forEach(currentTile => {
            // If condition to avoid overchecking because one collition is enouth to get the tiles position
            if (!collision) {
                loop1:
                for (let row = 0; row < NUM_TILES_HEIGHT; row++) {
                    for (let col = 0; col < NUM_TILES_WIDTH; col++) {
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

export function blockMoveSide(canvas, wall, block, setBlock, setBlockState, moveDir) {
    // Move block to left
    if (moveDir === blockMoveDirection.left) {
        blockMoveLeft(canvas, wall, block, setBlock)
    }
    // Move block to right
    else if (moveDir === blockMoveDirection.right) {
        blockMoveRight(canvas, wall, block, setBlock)
    }
    setBlockState(actionType.blockMove, blockMoveDirection.none)
}

function blockMoveLeft(canvas, wall, block, setBlock) {
    let newBlock = block
    let blockCanMove = blockCheckMoveLeft(canvas, wall, block)

    // If block can move move left
    if (blockCanMove) {
        newBlock.tiles.forEach(currentTile => {
            currentTile.x -= canvas.tileDim
        })
        newBlock.rotationPoint.x -= canvas.tileDim
        setBlock(newBlock)
    }
}

function blockMoveRight(canvas, wall, block, setBlock) {
    let newBlock = block
    let blockCanMove = blockCheckMoveRight(canvas, wall, block)

    // If block can move move right
    if (blockCanMove) {
        newBlock.tiles.forEach(currentTile => {
            currentTile.x += canvas.tileDim
        })
        newBlock.rotationPoint.x += canvas.tileDim
        setBlock(newBlock)
    }
}

function blockCheckMoveLeft(canvas, wall, block) {
    let blockCanMove = true
    let keepLooping = true
    // Check if there is a tile that can't move
    try {
        block.tiles.forEach(currentTile => {
            if (keepLooping) {
                let tileRow = Math.floor(currentTile.y / canvas.tileDim)
                let tileCol = Math.floor(currentTile.x / canvas.tileDim)
                if (tileCol > 0) {
                    loop1:
                    for (let row = 0; row < NUM_TILES_HEIGHT; row++) {
                        for (let col = 0; col < NUM_TILES_WIDTH; col++) {
                            if (Object.keys(wall[row][col]).length === 2) {
                                // If blockTileCol is bigger than wallTileCol + 1 there is no need to check with that wallTile
                                if (tileCol === col + 1 && tileRow >= row - 1 && tileRow <= row + 1) {
                                    blockCanMove = false
                                    keepLooping = false
                                    break loop1
                                }
                            }
                        }
                    }
                }
                else {
                    blockCanMove = false
                    keepLooping = false
                }
            }
        })
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        return blockCanMove
    }
}

function blockCheckMoveRight(canvas, wall, block) {
    let blockCanMove = true
    let keepLooping = true
    // Check if there is a tile that can't move
    try {
        block.tiles.forEach(currentTile => {
            if (keepLooping) {
                let tileRow = Math.floor(currentTile.y / canvas.tileDim)
                let tileCol = Math.floor(currentTile.x / canvas.tileDim)
                if (tileCol < NUM_TILES_WIDTH - 1) {
                    loop1:
                    for (let row = 0; row < NUM_TILES_HEIGHT; row++) {
                        for (let col = 0; col < NUM_TILES_WIDTH; col++) {
                            if (Object.keys(wall[row][col]).length === 2) {
                                // If blockTileCol is bigger than wallTileCol + 1 there is no need to check with that wallTile
                                if (tileCol === col - 1 && tileRow >= row - 1 && tileRow <= row + 1) {
                                    blockCanMove = false
                                    keepLooping = false
                                    break loop1
                                }
                            }
                        }
                    }
                }
                else {
                    blockCanMove = false
                    keepLooping = false
                }
            }
        })
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        return blockCanMove
    }
}

export function blockNewSpeed(currentBlock, setBlock) {
    let newBlock = currentBlock
    newBlock.speed += BLOCK_DELTA_SPEED
    setBlock(newBlock)
}

export function blockRotate(currentBlock, setBlock, wall, canvas) {
    if (currentBlock.type.name !== "O") {
        let newBlock = currentBlock
        // If the current angle is 90 or 270 there is no need to check for available space
        let canRotate = true
        // let checkSpace = blockNeedToCheckSpace(newBlock)
        // if (checkSpace) {
            // check available space
            // if there is no available space set canRotate = false
            // canRotate = blockCheckAvailableSpace(newBlock, wall, canvas)
        // }
        if (canRotate) {
            // rotate tiles
            newBlock.rotationAngle = blockGetNewRotationAngle(newBlock.rotationAngle)
            newBlock = blockGetRotated(newBlock, BLOCK_DELTA_ROTATION, canvas.tileDim)
            // newBlock.tiles = blockGetRotatedTiles(newBlock, BLOCK_DELTA_ROTATION, canvas.tileDim)
            // newBlock.rotationPoint = blockUpdateRotationPoint()
            // TODO: Check for collision
            setBlock(newBlock)
        }
    }
}

// function blockCheckAvailableSpace(block, wall, canvas) {
//     let isThereEnoughSpace = true
//     let tilesRows = blockGetTilesRows(block.tiles) 
//     // Check if canvas.width - tileX + tileX - wallTileX >= 3 * canvas.tileDim
//     block.tiles.forEach(tile => {
//         // Loop in the wall only on needed rows
//         for (let row = tilesRows[0]; row < tilesRows[0].length; row--) {

//         }

//     })
//     return isThereEnoughSpace
// }

// function blockGetTilesRows(tiles) {
//     let tilesRows = []
//     tiles.forEach(tile => {
//         let row = Math.floor(tile.y / canvas.tileDim)
//         tilesRows.push(row)
//     })
//     tilesRows.sort((a, b) => b - a)
//     let finalRows = [ ...new Set(tilesRows) ]
//     return finalRows
// }

// function blockNeedToCheckSpace(block) {
//     if (block.rotationAngle === 90 || block.rotationAngle === 270) {
//         return false
//     }
//     else {
//         return true
//     }
// }

export function blockReset(canvas, currentBlock, setBlock) {
    let newBlock = currentBlock
    newBlock.speed = BLOCK_INITIAL_SPEED
    newBlock.type = blockGetType()
    let tempBlock = blockSetTiles(canvas, newBlock.type)
    newBlock.tiles = tempBlock.tiles
    newBlock.rotationPoint = tempBlock.rotationPoint
    newBlock.rotationAngle = BLOCK_INITIAL_ROTATION
    console.log(newBlock)
    console.log(canvas)
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

function blockGetRotated(block, BLOCK_DELTA_ROTATION, tileDim) {
    // TODO:
        // - rotate the points around the rotation point
        // - correct the points and the rotation point positions
        // - take in account the block type and rotation angle
    let newBlock = block
    let rotatedPoints = blockGetRotatedPoints(newBlock, BLOCK_DELTA_ROTATION)
    newBlock = blockCorrectPositions(block, rotatedPoints, tileDim)
}

function blockGetRotatedPoints(block, rotationAngle) {
    let newTiles = []
    try {
        let rotationPoint = block.rotationPoint
        let angle = (Math.PI / 180) * rotationAngle
        block.tiles.forEach(tile => {
            let newTile = {}
            newTile.x = Math.cos(angle) * (tile.x - rotationPoint.x) - Math.sin(angle) * (tile.y - rotationPoint.y) + rotationPoint.x
            newTile.y = Math.sin(angle) * (tile.x - rotationPoint.x) - Math.cos(angle) * (tile.y - rotationPoint.y) + rotationPoint.y
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

function blockCorrectPositions(block, rotatedTiles, tileDim) {
    let newBlock = block
    let newTiles = rotatedTiles
    newBlock.tiles = blockSetTilesPosition(newBlock, newTiles, tileDim)
    newBlock.rotationPoint = blockSetRotationPoint(newBlock, tileDim)
    return newBlock
}

function blockSetTilesPosition(block, tiles, tileDim) {
    let newTiles = tiles
    // Correct rotated points of L, J, Z, S blocks
    if (block.type.name !== "I" && block.type.name !== "O") {
        newTiles.forEach(tile => {
            switch (block.rotationAngle) {
                case 0:
                    tile.x -= tileDim
                    tile.y += tileDim
                    break
                case 90:
                    tile.x -= tileDim
                    break
                case 180:
                    tile.y -= tileDim * 2
                    break
                case 270:
                    tile.x += tileDim * 2
                    tile.y += tileDim
                    break
                default:
                    console.log("Unknown angle...")
                    break
            }
        })
    }
    // Correct rotated points of I block
    else if (block.type.name === "I") {
        newTiles.forEach(tile => {
            switch (block.rotationAngle) {
                case 0:
                    tile.x -= tileDim * 3
                    break
                case 90:
                    break
                case 180:
                    tile.y -= tileDim * 3
                    break
                case 270:
                    tile.x += tileDim * 3
                    tile.y += tileDim * 3
                    break
                default:
                    console.log("Unknown angle...")
                    break
            }
        })
    }
    return newTiles
}

function blockSetRotationPoint(block, tileDim) {
    let tiles = block.tiles
    let newRotationPoint = block.rotationPoint
    let centralPoint = tiles[3]
    // If the block is L, J, Z, S or T it's point 4 + fixes
    if (block.type.name === "L" || block.type.name === "J" || block.type.name === "Z" || block.type.name === "S" || block.type.name === "T") {
        switch (block.rotationAngle) {
            case 0:
                newRotationPoint = { x: centralPoint.x, y: centralPoint.y + tileDim }
                break
            case 90:
                newRotationPoint = { x: centralPoint.x - tileDim, y: centralPoint.y }
                break
            case 180:
                newRotationPoint = { x: centralPoint.x, y: centralPoint.y - tileDim }
                break
            case 270:
                newRotationPoint = { x: centralPoint.x + tileDim, y: centralPoint.y }
                break
            default:
                console.log("Unknown angle...")
                break
        }
    }
    // If the block is I it's always the point 4
    else {
        newRotationPoint = { x: centralPoint.x, y: centralPoint.y }
    }
    return newRotationPoint
}

function blockGetNewRotationAngle(currentAngle) {
    let newAngle = currentAngle
    if (newAngle >= 270) {
        newAngle = 0
    }
    else {
        newAngle += BLOCK_DELTA_ROTATION
    }
    return newAngle
}

function blockSetTiles(canvas, type) {
    let block = {}
    switch (type.name) {
        case blockType.I.name:
            block = blockSetI(canvas)
            return block
        case blockType.S.name:
            block = blockSetS(canvas)
            return block
        case blockType.Z.name:
            block = blockSetZ(canvas)
            return block
        case blockType.T.name:
            block = blockSetT(canvas)
            return block
        case blockType.L.name:
            block = blockSetL(canvas)
            return block
        case blockType.J.name:
            block = blockSetJ(canvas)
            return block
        case blockType.O.name:
            block = blockSetO(canvas)
            return block
        default:
            console.log("Unknown block...")
            break
    }
}

function blockSetI(canvas) {
    let leftMostX = canvas.width / 2
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 4 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
    return block
}
function blockSetS(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
    return block
}
function blockSetZ(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 3 })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y + canvas.tileDim }
    return block
}
function blockSetT(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y + canvas.tileDim }
    return block
}
function blockSetL(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
    return block
}
function blockSetJ(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 3 })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
    return block
}
function blockSetO(canvas) {
    let leftMostX = canvas.width / 2 - canvas.tileDim
    let block = { tiles: [], rotationPoint: {} }
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
    block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
    let centralPoint = block.tiles[3]
    block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
    return block
}

function blockGetType() {

    let type = {}
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