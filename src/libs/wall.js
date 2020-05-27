import { NUM_TILES_WIDTH, NUM_TILES_HEIGHT } from '../globals.js'

export function wallStart(setWall) {
    let wall = []
    for (let row = 0; row < NUM_TILES_HEIGHT; row++) {
        let wallRow = []
        for (let col = 0; col < NUM_TILES_WIDTH; col++) {
            wallRow.push({})
        }
        wall.push(wallRow)
    }
    setWall(wall)
}

export function wallSetTiles(tiles, wall, setWall, tileDim) {
    // Get the column and row numbers
    try {
        let localWall = wall
        tiles.forEach(tile => {
            let col = Math.floor(tile.x / tileDim)
            let row = Math.floor(tile.y / tileDim)
            // Set the tile position values
            if (col < NUM_TILES_WIDTH && col >= 0 && row < NUM_TILES_HEIGHT && row >= 0) {
                localWall[row][col] = { x: col * tileDim, y: row * tileDim }
            }
        })
        localWall = wallUpdate(localWall, tileDim)
        setWall(localWall)
    }
    catch (e) {
        console.log(e.message)
    }

}

export function wallLoop(ctx2D, wall, setWall, tileDim) {
    wallDraw(ctx2D, wall, tileDim)
}

function wallDraw(ctx2D, wall, tileDim) {
    try {
        for (let row = 0; row < NUM_TILES_HEIGHT; row++) {
            for (let col = 0; col < NUM_TILES_WIDTH; col++) {
                if ((wall[row][col].x || wall[row][col].x === 0) && (wall[row][col].y || wall[row][col].y === 0)) {
                    ctx2D.beginPath()
                    ctx2D.fillStyle = "grba(0, 0, 255, 1)"
                    ctx2D.rect(wall[row][col].x, wall[row][col].y, tileDim, tileDim)
                    ctx2D.fill()
                }
            }
        }
    }
    catch (e) {
        console.log(e.message)
    }
}

function wallUpdate(wall, tileDim) {
    try {
        let newWall = wall
        for (let row = NUM_TILES_HEIGHT - 1; row >= 0; row--) {
            let rowLength = 0
            for (let col = 0; col < NUM_TILES_WIDTH; col++) {
                if (Object.keys(newWall[row][col]).length === 2) {
                    rowLength++
                    if (rowLength === NUM_TILES_WIDTH) {
                        // Remove row where all tiles are not empty
                        newWall = wallRemoveRow(newWall, row)
                        // Move down tiles above the emptied row
                        newWall = wallMoveTilesDown(newWall, row - 1, tileDim)
                        // Recall self
                        wallUpdate(newWall, tileDim)
                    }
                }
            }
        }
        return newWall
    }
    catch (e) {
        console.log(e.message)
    }
}

function wallRemoveRow(wall, row) {
    try {
        let newWall = wall
        for (let col = 0; col < NUM_TILES_WIDTH; col++) {
            newWall[row][col] = {}
        }
        return newWall
    }
    catch (e) {
        console.log(e.message)
    }
}

function wallMoveTilesDown(wall, startRow, tileDim) {
    try {
        let newWall = wall
        for (let row = startRow; row >= 0; row--) {
            for (let col = 0; col < NUM_TILES_WIDTH; col++) {
                if ((wall[row][col].x || wall[row][col].x === 0) && (wall[row][col].y || wall[row][col].y === 0)) {
                    newWall[row][col].y += tileDim
                }
            }
        }
        return newWall
    }
    catch (e) {
        console.log(e.message)
    }
}