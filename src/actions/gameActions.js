
export const setGameLevel = level => ({
    type: "SET_GAME_LEVEL",
    level
})

export const setGameScore = score => ({
    type: "SET_GAME_SCORE",
    score
})

export const setGameWall = wall => ({
    type: "SET_GAME_WALL",
    wall
})

export const setGameOn = gameOn => ({
    type: "SET_GAME_ON",
    gameOn
})

export const setGamePause = gamePaused => ({
    type: "SET_GAME_PAUSED",
    gamePaused
})

export const setGameState = gameState => ({
    type: "SET_GAME_STATE",
    gameState
})