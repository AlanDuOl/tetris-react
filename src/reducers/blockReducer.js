import { BLOCK_INITIAL_SPEED } from '../globals.js'

const initialState = {
    currentBlock: {
        speedUp: false,
        turn: false,
        moveLeft: false,
        moveRight: false,
        on: false,
        speed: BLOCK_INITIAL_SPEED,
        number: 0,
        position: { left: 0, bottom: 0 },
        rotation: 0
    }
}

const blockReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    switch (action.type) {
        case "SET_BLOCK_TURN":
            // Merge objects into the new state
            return Object.assign({}, state, { turn: action.value })
        case "SET_BLOCK_MOVE_LEFT":
            return Object.assign({}, state, { moveLeft: action.value })
        case "SET_BLOCK_MOVE_RIGHT":
            return Object.assign({}, state, { moveRight: action.value })
        case "SET_BLOCK_SPEED_UP":
            return Object.assign({}, state, { speedUp: action.value })
        case "SET_BLOCK_SPEED":
            return Object.assign({}, state, { speed: action.value })
        case "SET_BLOCK_ON":
            return Object.assign({}, state, { on: action.value })
        case "SET_BLOCK_POSITION":
            return Object.assign({}, state, { position: action.value })
        case "SET_BLOCK_ROTATION":
            return Object.assign({}, state, { rotation: action.value })
        case "SET_BLOCK_NUMBER":
            return Object.assign({}, state, { number: action.value })
        case "SET_BLOCK_STATE":
            return Object.assign({}, state, action.value)
        default:
            // Return the current state if action.type does not match
            return state
    }
}

export default blockReducer