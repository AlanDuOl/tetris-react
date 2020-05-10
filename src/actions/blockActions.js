
export const setBlockState = (actionType, actionValue) => {
    
    switch (actionType) {
        case "SET_BLOCK_TURN":
            return { type: "SET_BLOCK_TURN", value: actionValue }
        case "SET_BLOCK_MOVE_LEFT":
            return { type: "SET_BLOCK_MOVE_LEFT", value: actionValue }
        case "SET_BLOCK_MOVE_RIGHT":
            return { type: "SET_BLOCK_MOVE_RIGHT", value: actionValue }
        case "SET_BLOCK_SPEED_UP":
            return { type: "SET_BLOCK_SPEED_UP", value: actionValue }
        case "SET_BLOCK_SPEED":
            return { type: "SET_BLOCK_SPEED", value: actionValue }
        case "SET_BLOCK_ON":
            return { type: "SET_BLOCK_ON", value: actionValue }
        case "SET_BLOCK_POSITION":
            return { type: "SET_BLOCK_POSITION", value: actionValue }
        case "SET_BLOCK_ROTATION":
            return { type: "SET_BLOCK_ROTATION", value: actionValue }
        case "SET_BLOCK_RESTART":
            return { type: "SET_BLOCK_RESTART", value: actionValue }
        case "SET_BLOCK_STATE":
            return { type: "SET_BLOCK", value: actionValue }
        default:
            return { type: "", value: null }
    }

}
