import { actionType as blockActionType } from '../globals.js'

export const setBlockState = (actionType, actionValue) => {
    
    switch (actionType) {
        case blockActionType.blockMove:
            return { type: blockActionType.blockMove, value: actionValue }
        case blockActionType.blockSpeed:
            return { type: blockActionType.blockSpeed, value: actionValue }
        case blockActionType.blockPosition:
            return { type: blockActionType.blockPosition, value: actionValue }
        case blockActionType.blockRotation:
            return { type: blockActionType.blockRotation, value: actionValue }
        case blockActionType.blockType:
            return { type: blockActionType.blockType, value: actionValue }
        case blockActionType.blockTiles:
            return { type: blockActionType.blockTiles, value: actionValue }
        case "SET_BLOCK_STATE":
            return { type: "SET_BLOCK", value: actionValue }
        default:
            return { type: "", value: null }
    }

}
