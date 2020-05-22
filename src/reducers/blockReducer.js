import { BLOCK_INITIAL_SPEED, blockMoveDirection } from '../globals'

const initialState = {
    moveDir: blockMoveDirection.none,
    speed: BLOCK_INITIAL_SPEED,
    type: "",
    position: { x: 0, y: 0 }, // Set left position relative to tileDim and bottom proportional to to viewportHeight
    rotation: 0
}

const blockReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    // Merge objects into the new state
    switch (action.type) {
        case "SET_BLOCK_MOVE":
            return Object.assign({}, state, { moveDir: action.value })
        case "SET_BLOCK_SPEED":
            return Object.assign({}, state, { speed: action.value })
        case "SET_BLOCK_POSITION":
            return Object.assign({}, state, { position: action.value })
        case "SET_BLOCK_ROTATION":
            return Object.assign({}, state, { rotation: action.value })
        case "SET_BLOCK_TYPE":
            return Object.assign({}, state, { type: action.value })
        case "SET_BLOCK":
            return Object.assign({}, state, action.value)
        default:
            // Return the current state if action.type does not match
            return state
    }
}

export default blockReducer