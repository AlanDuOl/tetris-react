
export const NUM_BLOCK_TYPES = 7
export const BLOCK_NUM_TILES = 4
export const WALL_TILES_WIDTH = 10
export const WALL_TILES_HEIGHT = 17
export const BLOCK_INITIAL_SPEED = 1
export const BLOCK_DELTA_SPEED = 4
export const BLOCK_DELTA_ROTATION = 90
export const BLOCK_INITIAL_ROTATION = 0
export const TIMER_SPEED = 50

export const blockMoveDirection = {
    left: "left",
    right: "right",
    none: "none"
}

export const actionType = {
    blockMove: "SET_BLOCK_MOVE",
    blockSpeed: "SET_BLOCK_SPEED",
    blockPosition: "SET_BLOCK_POSITION",
    blockRotation: "SET_BLOCK_ROTATION",
    blockType: "SET_BLOCK_TYPE",
    blockTiles: "SET_BLOCK_TILES",
}


export const blockType = {
    I: {
        name: "I",
        fillStyle: "rgb(0, 255, 0)"
    },
    S: {
        name: "S",
        fillStyle: "rgb(0, 255, 0)"
    },
    Z: {
        name: "Z",
        fillStyle: "rgb(0, 255, 0)"
    },
    T: {
        name: "T",
        fillStyle: "rgb(0, 255, 0)"
    },
    L: {
        name: "L",
        fillStyle: "rgb(0, 255, 0)"
    },
    J: {
        name: "J",
        fillStyle: "rgb(0, 255, 0)"
    },
    O: {
        name: "O",
        fillStyle: "rgb(0, 255, 0)"
    }
}

// export const timerSpeeds = {
//     level1: 400,
//     level2: 300,
//     level3: 200,
//     level4: 100,
//     speedUp: 50
// }