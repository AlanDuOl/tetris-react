import { NUM_TILES_WIDTH, NUM_TILES_HEIGHT } from '../globals.js'

const initialState = {
    level: 1,
    score: 0,
    wall: new Array([NUM_TILES_WIDTH][NUM_TILES_HEIGHT]),
    gameOn: false,
    gamePaused: false
}

const gameReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    switch (action.type) {
        case "SET_GAME_LEVEL":
            // Merge objects into the new state
            return Object.assign({}, state, { level: action.level })
        case "SET_GAME_SCORE":
            return Object.assign({}, state, { score: action.score })
        case "SET_GAME_WALL":
            return Object.assign({}, state, { wall: action.wall })
        case "SET_GAME_ON":
            return Object.assign({}, state, { gameOn: action.gameOn })
        case "SET_GAME_PAUSED":
            return Object.assign({}, state, { gamePaused: action.gamePaused })
        default:
            // Return the current state if action.type does not match
            return state
    }
}

export default gameReducer