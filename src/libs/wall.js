import { WALL_TILES_WIDTH, WALL_TILES_HEIGHT, actionType } from '../globals.js'

export function wallInit(setWall) {
    let wall = []
    try {
        for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
            let wallRow = []
            for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                wallRow.push({})
            }
            wall.push(wallRow)
        }
        setWall(wall)
    }
    catch (e) {
        console.error(e.message)
    }
}

export function wallDraw(ctx2D, wall, tileDim) {
    try {
        for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
            for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                if (Object.keys(wall[row][col]).length === 2) {
                    ctx2D.beginPath()
                    ctx2D.fillStyle = "grba(0, 0, 255, 1)"
                    ctx2D.rect(wall[row][col].x, wall[row][col].y, tileDim, tileDim)
                    ctx2D.fill()
                }
            }
        }
    }
    catch (e) {
        console.error(e.message)
    }
}

export function wallAddTiles(tiles, wall, setWall, tileDim) {
    try {
        tiles.forEach(tile => {
            // Get the column and row numbers
            let col = Math.floor(tile.x / tileDim)
            let row = Math.floor(tile.y / tileDim)
            // Set the tile position values if they are inside the wall area
            if (col < WALL_TILES_WIDTH && col >= 0 && row < WALL_TILES_HEIGHT) {
                wall[row][col] = { x: col * tileDim, y: row * tileDim }
            }
        })
        setWall(wall)
    }
    catch (e) {
        console.error(e.message)
    }
}

export function wallUpdate(wall, tileDim, initialNum) {
    // this is to know how many lines have been removed and is used to update the score/level
    let numRemovedRows = initialNum
    try {
        // Loop in rows from bottom to top
        for (let row = WALL_TILES_HEIGHT - 1; row >= 0; row--) {
            let rowLength = 0
            for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                if (Object.keys(wall[row][col]).length === 2) {
                    rowLength++
                    // If there is a row without empty tiles, remove it and move the abore tiles down (if any)
                    if (rowLength === WALL_TILES_WIDTH) {
                        // Remove row where all tiles are not empty
                        wallRemoveRow(wall, row)
                        // Move down tiles above the emptied row
                        wallMoveTilesDown(wall, row - 1, tileDim)
                        // Increase numRemovedRows
                        // Recall self increasing numRemovedRows
                        numRemovedRows = wallUpdate(wall, tileDim, ++numRemovedRows)
                    }
                }
            }
        }
    }
    catch (e) {
        console.error(e.message)
    }
    return numRemovedRows
}

// function wallCheckRowsToRemove(wall, tileDim, updateNumber) {

//     let gameOver = false
//     // Set game over if the tile position is outside the wall area
//     if (row < 0) {
//         gameOver = true
//     }
//     // Check for game over
//     if (gameOver) {
//         alert("Game Over!!")
//         setGameState(actionType.gameOn, false)
//     }
//     // Update array has 2 values. The first is the update wall and the second is the number of rows removed from the wall
//     let updateArray = wallUpdate(wall, tileDim, 0)
//     // If any row has been removed, update the wall and the game info (score, level, record)
//     if (updateArray[1] > 0) {
//         setGameState(actionType.gameScore, gameReducer.score += updateArray[1])
//     }
//     wall = updateArray[0]
// }

function wallRemoveRow(wall, row) {
    wall[row] = wallGetEmptyRow()
}

function wallMoveTilesDown(wall, startRow, tileDim) {
    try {
        let newWall = wall
        let emptyRow = wallGetEmptyRow()
        // Loop in rows from bottom to top
        for (let row = startRow; row >= 0; row--) {
            // Loop in the columns and and increase y postion by tileDim where the tile is not empty
            for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                if ((wall[row][col].x || wall[row][col].x === 0) && (wall[row][col].y || wall[row][col].y === 0)) {
                    newWall[row][col].y += tileDim
                }
            }
            // Make the bellow row be equal to the current row
            newWall[row + 1] = newWall[row]
            // Make the current row be equal to an empty row
            newWall[row] = emptyRow
        }
        return newWall
    }
    catch (e) {
        console.error(e.message)
    }
}

function wallGetEmptyRow() {
    let wallRow = []
    for (let col = 0; col < WALL_TILES_WIDTH; col++) {
        let emptyTile = {}
        wallRow.push(emptyTile)
    }

    if (wallRow.length === WALL_TILES_WIDTH) {
        return wallRow
    }
    else {
        console.error("Error creating empty row")
    }
}