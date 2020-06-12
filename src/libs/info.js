import { LEVEL_FACTOR, actionType, GAME_INITIAL_LEVEL, GAME_INITIAL_SCORE } from '../globals.js'

export function Info() {
    // Obejct variables
    this.score = 0
    this.level = 0
    this.record = 0

    // Getters
    // this.getScore = () => this.score
    // this.getLevel = () => this.level
    // this.getRecord = () => this.record

    // // Setters
    // this.setScore = val => { this.score = val }
    // this.setLevel = val => { this.level = val }
    // this.setRecord = val => { this.record = val }

    this.init = async () => {
        let currentRecord = await this.recordGet()
        this.score = GAME_INITIAL_SCORE
        this.level = GAME_INITIAL_LEVEL
        this.record = currentRecord
    }

    this.update = (numRemovedRows, gameReducer, setGameState) => {
        // Update score
        let newScore = gameReducer.score + numRemovedRows
        setGameState(actionType.gameScore, newScore)
        // Changes in score tigger updates in record and level
        // Check if the level and record need to update
        this.levelUpdate(newScore, gameReducer.level, setGameState)
        this.recordUpdate(newScore, gameReducer.record, setGameState)
    }

    this.recordGet = async () => {
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

    this.recordSave = (newRecord) => {
        const data = { id: 1, record: newRecord }
        const url = 'http://localhost:4000/record/update'
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .catch(err => console.error(err))
    }

    this.recordUpdate = (score, record, setGameState) => {
        if (score > 0 && score > record) {
            setGameState(actionType.gameRecord, score)
            infoSaveRecord(score)
        }
    }

    this.levelUpdate = (score, level, setGameState) => {
        let futureLevel = Math.floor(score / LEVEL_FACTOR) + 1
        if (futureLevel > level) {
            setGameState(actionType.gameLevel, level + 1)
        }
    }

}