import { actionType as gameActionType } from '../globals.js'

export const setGameState = (actionType, actionValue) => {

    switch (actionType) {
        case "SET_GAME_WALL":
            return { type: "SET_GAME_WALL", value: actionValue }
        case gameActionType.gameLevel:
            return { type: gameActionType.gameLevel, value: actionValue }
        case gameActionType.gameScore:
            return { type: gameActionType.gameScore, value: actionValue }
        case gameActionType.gameOn:
            return { type: gameActionType.gameOn, value: actionValue }
        case gameActionType.gamePaused:
            return { type: gameActionType.gamePaused, value: actionValue }
        case "SET_GAME_STATE":
            return { type: "SET_GAME_STATE", value: actionValue }
        case gameActionType.gameRecord:
            return { type: gameActionType.gameRecord, value: actionValue } 
        default:
            return { type: "", value: null };
    }
    
}