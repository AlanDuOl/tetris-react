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

    this.init = async setGameState => {
        let currentRecord = await this.recordGet()
        this.score = GAME_INITIAL_SCORE
        this.level = GAME_INITIAL_LEVEL
        this.record = currentRecord
        setGameState(actionType.gameScore, GAME_INITIAL_SCORE)
        setGameState(actionType.level, GAME_INITIAL_LEVEL)
        setGameState(actionType.record, currentRecord)
    }

    this.update = (numRemovedRows, setGameState) => {
        // Update score
        let newScore = this.score + numRemovedRows
        this.updateScore(newScore, setGameState)
        // Changes in score tigger updates in record and level
        // Check if the level and record need to update
        this.updateLevel(newScore, setGameState)
        this.updateRecord(newScore, setGameState)
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

    this.saveRecord = (newRecord) => {
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

    this.updateScore = (newScore, setGameState) => {
        this.score = newScore
        setGameState(actionType.gameScore, newScore)
    }

    this.updateRecord = (newScore, setGameState) => {
        if (newScore > 0 && newScore > this.record) {
            this.record = newScore
            setGameState(actionType.gameRecord, newScore)
            this.saveRecord(newScore)
        }
    }

    this.updateLevel = (newScore, setGameState) => {
        let futureLevel = Math.floor(newScore / LEVEL_FACTOR) + 1
        if (futureLevel > this.level) {
            setGameState(actionType.gameLevel, this.level + 1)
        }
    }

}