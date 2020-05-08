
export const setBlockState = (actionType, stateValue) => {

    try {
        switch (actionType) {
            case "SET_BLOCK_TURN":
                return { type: "SET_BLOCK_TURN", value: stateValue}
            case "SET_BLOCK_MOVE_LEFT":
                return { type: "SET_BLOCK_MOVE_LEFT", value: stateValue}
            case "SET_BLOCK_MOVE_RIGHT":
                return { type: "SET_BLOCK_MOVE_RIGHT", value: stateValue}
            case "SET_BLOCK_SPEED_UP":
                return { type: "SET_BLOCK_SPEED_UP", value: stateValue}
            case "SET_BLOCK_SPEED":
                return { type: "SET_BLOCK_SPEED", value: stateValue}
            case "SET_BLOCK_ON":
                return { type: "SET_BLOCK_ON", value: stateValue}
            case "SET_BLOCK_POSITION":
                return { type: "SET_BLOCK_POSITION", value: stateValue}
            case "SET_BLOCK_POSITION":
                return { type: "SET_BLOCK_ROTATION", value: stateValue}
            case "SET_BLOCK_STATE":
                return { type: "SET_BLOCK_STATE", value: stateValue}
            default:
                throw Error("Unknown block action type")
        }
    }
    catch(e) {
        console.log(e.message)
    }
    
}
