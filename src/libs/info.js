import { LEVEL_FACTOR, actionType, GAME_INITIAL_LEVEL, GAME_INITIAL_SCORE } from '../globals.js'

export async function infoInit(setGameState) {
    let record = await infoGetRecord()
    setGameState(actionType.gameRecord, record)
    setGameState(actionType.gameLevel, GAME_INITIAL_LEVEL)
    setGameState(actionType.gameScore, GAME_INITIAL_SCORE)
}

export function infoUpdate(numRemovedRows, gameReducer, setGameState) {
    // Update score
    let newScore = gameReducer.score + numRemovedRows
    setGameState(actionType.gameScore, newScore)
    // Changes in score tigger updates in record and level
    // Check if the level and record need to update
    infoLevelUpdate(newScore, gameReducer.level, setGameState)
    infoRecordUpdate(newScore, gameReducer.record, setGameState)
}

async function infoGetRecord() {
    const url = 'http://localhost:4000/record/get'
    const response = await fetch(url)
    const data = await response.json()
    if (data[0].id || data[0].id === 0) {
        return data[0].value
    }
    else {
        console.error("No record data")
    }
}

function infoSaveRecord(newRecord) {
    const data = { id: 1, record: newRecord }
    const url = 'http://localhost:4000/record/update'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
    })
    .catch(err => console.error(err))
}

function infoRecordUpdate(score, record, setGameState) {
    if (score > 0 && score > record) {
        setGameState(actionType.gameRecord, score)
        infoSaveRecord(score)
    }
}

function infoLevelUpdate(score, level, setGameState) {
    let futureLevel = Math.floor(score / LEVEL_FACTOR) + 1
    if (futureLevel > level) {
        setGameState(actionType.gameLevel, level + 1)
    }
}