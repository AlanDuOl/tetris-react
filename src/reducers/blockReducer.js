import { BLOCK_INITIAL_SPEED, blockMoveDirection, BLOCK_INITIAL_ROTATION_ANGLE, actionType } from '../globals'

const initialState = {
    moveDir: blockMoveDirection.none,
    speedUp: false,
    type: { name: "", fillStyle: "" },
    position: { x: 0, y: 0 }, // Set left position relative to tileDim and bottom proportional to to viewportHeight
    rotate: false,
    tiles: []
}

const blockReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    // Merge objects into the new state
    switch (action.type) {
        case actionType.blockMove:
            return Object.assign({}, state, { moveDir: action.value })
        case actionType.blockSpeed:
            return Object.assign({}, state, { speedUp: action.value })
        case actionType.blockPosition:
            return Object.assign({}, state, { position: action.value })
        case actionType.blockRotation:
            return Object.assign({}, state, { rotate: action.value })
        case actionType.blockType:
            return Object.assign({}, state, { type: action.value })
        case actionType.blockTiles:
            return Object.assign({}, state, { tiles: action.value })
        case "SET_BLOCK":
            return Object.assign({}, state, action.value)
        default:
            // Return the current state if action.type does not match
            return state
    }
}

export default blockReducer