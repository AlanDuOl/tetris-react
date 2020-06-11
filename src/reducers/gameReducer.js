import { actionType } from '../globals.js'

const initialState = {
    level: 1,
    score: 0,
    record: 0,
    wall: [],
    gameOn: false,
    gamePaused: false,
    gameOver: false
}

const gameReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    switch (action.type) {
        case actionType.gameLevel:
            return Object.assign({}, state, { level: action.value }) // Merge objects into the new state
        case actionType.gameScore:
            return Object.assign({}, state, { score: action.value })
        case actionType.gameRecord:
            return Object.assign({}, state, { record: action.value })
        case actionType.gameOn:
            return Object.assign({}, state, { gameOn: action.value })
        case actionType.gamePaused:
            return Object.assign({}, state, { gamePaused: action.value })
        case actionType.gameOver:
            return Object.assign({}, state, { gameOver: action.value } )
        default:
            return state  // Return the current state if action.type does not match
    }
}

export default gameReducer