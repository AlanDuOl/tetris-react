
const initialState = {
    speedUp: false,
    turn: false,
    moveLeft: false,
    moveRight: false,
    on: true,
    speed: 0,
    number: 0,
    position: { left: 0, bottom: 0 },
    rotation: 0,
    restart: false
}

const blockReducer = (state = initialState, action) => {
    // Set the new state based on the action type and value sent through the action
    // Merge objects into the new state
    switch (action.type) {
        case "SET_BLOCK_TURN":
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
        case "SET_BLOCK_RESTART":
            return Object.assign({}, state, { restart: action.value })
        case "SET_BLOCK":
            return Object.assign({}, state, action.value)
        default:
            // Return the current state if action.type does not match
            return state
    }
}

export default blockReducer