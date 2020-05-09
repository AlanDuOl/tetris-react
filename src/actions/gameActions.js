
export const setGameState = (actionType, actionValue) => {

    try {
        switch (actionType) {
            case "SET_GAME_WALL":
                return { type: "SET_GAME_WALL", value: actionValue }
            case "SET_GAME_LEVEL":
                return { type: "SET_GAME_LEVEL", value: actionValue }
            case "SET_GAME_SCORE":
                return { type: "SET_GAME_SCORE", value: actionValue }
            case "SET_GAME_ON":
                return { type: "SET_GAME_ON", value: actionValue }
            case "SET_GAME_PAUSED":
                return { type: "SET_GAME_PAUSED", value: actionValue }
            case "SET_GAME_STATE":
                return { type: "SET_GAME_STATE", value: actionValue }
            default:
                return { type: "", value: null };
        }
    }
    catch(e) {
        console.log(e.message)
    } 
    
}