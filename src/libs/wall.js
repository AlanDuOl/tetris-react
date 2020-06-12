import { WALL_TILES_WIDTH, WALL_TILES_HEIGHT, BLOCK_NUM_TILES } from '../globals.js'


export function Wall() {

    this.tiles = []

    function wallInit(setWall) {
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

    function wallDraw(ctx2D, wall, tileDim) {
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

    function wallUpdate(tiles, wall, setWall, tileDim) {
        let numRemovedRows = 0
        wallAddTiles(tiles, wall, setWall, tileDim)
        numRemovedRows = wallUpdateTiles(wall, setWall, tileDim, numRemovedRows)
        return numRemovedRows
    }

    function wallUpdateTiles(wall, setWall, tileDim, initialValue) {
        // this is to know how many lines have been removed and is used to update the score/level
        let numRemovedRows = initialValue
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
                            wallRemoveTiles(wall, row)
                            // Move down tiles above the emptied row
                            wallMoveTilesDown(wall, setWall, row - 1, tileDim)
                            // Recall self increasing numRemovedRows to see if there are more rows to remove
                            numRemovedRows = wallUpdateTiles(wall, setWall, tileDim, ++numRemovedRows)
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

    function wallAddTiles(tiles, wall, setWall, tileDim) {
        try {
            tiles.forEach(tile => {
                // Get the column and row numbers
                let col = Math.floor(tile.x / tileDim)
                let row = Math.floor(tile.y / tileDim)
                // Set the tile x and y position values in the range of (15 > col >= 0) and (21 > row >= -4)
                if (col < WALL_TILES_WIDTH && col >= 0 && row < WALL_TILES_HEIGHT && row >= - BLOCK_NUM_TILES) {
                    // Add 4 to every row index so no index is smaller than 0 and grater than 21
                    // Negative y position is needed to check for game over
                    // Because the game over check must happen after the wall updates
                    wall[row + BLOCK_NUM_TILES][col] = { x: col * tileDim, y: row * tileDim }
                }
            })
            setWall(wall)
        }
        catch (e) {
            console.error(e.message)
        }
    }

    function wallRemoveTiles(wall, row) {
        // Make current row empty
        wall[row] = wallGetEmptyRow()
    }

    function wallMoveTilesDown(wall, setWall, startRow, tileDim) {
        try {
            let emptyRow = wallGetEmptyRow()
            // Loop in rows from bottom to top
            for (let row = startRow; row >= 0; row--) {
                // Loop in the columns and and increase y postion by tileDim where the tile is not empty
                for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                    // if ((wall[row][col].x || wall[row][col].x === 0) && (wall[row][col].y || wall[row][col].y === 0)) {
                    if (Object.keys(wall[row][col]).length === 2) {
                        wall[row][col].y += tileDim
                    }
                }
                // Make the bellow row be equal to the current row
                wall[row + 1] = wall[row]
                // Make the current row be equal to an empty row
                wall[row] = emptyRow
            }
            setWall(wall)
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

}