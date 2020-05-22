
export const NUM_BLOCK_TYPES = 7
export const BLOCK_NUM_TILES = 4
export const NUM_TILES_WIDTH = 10
export const NUM_TILES_HEIGHT = 36
export const BLOCK_INITIAL_SPEED = 1
export const BLOCK_DELTA_SPEED = 5
export const BLOCK_DELTA_ROTATION = 90
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
    blockType: "SET_BLOCK_TYPE"
}


export const blockType = {
    I: "I",
    S: "S",
    Z: "Z",
    T: "T",
    L: "L",
    J: "J",
    O: "O"
}

// export const timerSpeeds = {
//     level1: 400,
//     level2: 300,
//     level3: 200,
//     level4: 100,
//     speedUp: 50
// }