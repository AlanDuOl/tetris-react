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
    let localWall = wall
    tiles.forEach(tile => {
        let col = Math.floor(tile.x / tileDim)
        let row = Math.floor(tile.y / tileDim)
        // Set the tile position
        if (col < 15) {
            localWall[row][col] = { x: col * tileDim, y: row * tileDim }
        }
    })
    // console.log(wall)
    setWall(localWall)
}

export function wallLoop(ctx2D, wall, tileDim) {
    wallDraw(ctx2D, wall, tileDim)
}

function wallDraw(ctx2D, wall, tileDim) {
    for (let row = 0; row < wall.length; row++) {
        for (let col = 0; col < wall[0].length; col++) {
            if (wall[row][col].x && wall[row][col].y) {
                ctx2D.beginPath()
                ctx2D.rect(wall[row][col].x, wall[row][col].y, tileDim, tileDim)
                ctx2D.fillStyle = "grba(0, 0, 255, 1)"
                ctx2D.fill()
            }
        }
    }
}
