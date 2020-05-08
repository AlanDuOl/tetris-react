import { BLOCK_INITIAL_SPEED } from '../globals.js'

const initialState = {
    currentBlock: {
        speed: BLOCK_INITIAL_SPEED,
        number: 0,
        on: false,
        position: { x: 0, y: 0 }
    }
}

const blockReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    switch (action.type) {
        case "SET_BLOCK_SPEED":
            // Merge objects into the new state
            return Object.assign({}, state, { speed: action.value })
        case "SET_BLOCK_ON":
            return Object.assign({}, state, { on: action.value })
        case "SET_BLOCK_POSITION":
            return Object.assign({}, state, { position: action.value })
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