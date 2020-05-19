
export const setBlockState = (actionType, actionValue) => {
    
    switch (actionType) {
        case "SET_BLOCK_MOVE":
            return { type: "SET_BLOCK_MOVE", value: actionValue }
        case "SET_BLOCK_SPEED":
            return { type: "SET_BLOCK_SPEED", value: actionValue }
        case "SET_BLOCK_POSITION":
            return { type: "SET_BLOCK_POSITION", value: actionValue }
        case "SET_BLOCK_ROTATION":
            return { type: "SET_BLOCK_ROTATION", value: actionValue }
        case "SET_BLOCK_STATE":
            return { type: "SET_BLOCK", value: actionValue }
        default:
            return { type: "", value: null }
    }

}
