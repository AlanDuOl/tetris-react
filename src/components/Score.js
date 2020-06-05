import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/Score.css'
import { gameGetRecord, gameSaveRecord } from '../libs/game.js'
import { setGameState } from '../actions/gameActions'

function Score(props) {

    const [score, setScore] = useState(0)
    const [record, setRecord] = useState(0)
    const [level, setLevel] = useState(0)

    useEffect(() => {
        gameGetRecord(setRecord, setGameState)
    }, [])

    useEffect(() => {
        setScore(props.gameReducer.score)
        setLevel(props.gameReducer.level)
        setRecord(props.gameReducer.record)
    }, [props.gameReducer.score])

    useEffect(() => {
        gameSaveRecord(props.gameReducer.record)
    }, [props.gameReducer.record])

    return (
        <section id="score">
            <div id="score-container">
                <div className="score-element">
                    <label htmlFor="score-current">Points:</label>
                    <output id="score-current"> {score}</output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-level">Level:</label>
                    <output id="score-level"> {level}</output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-record">Record:</label>
                    <output id="score-record"> {record}</output>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setGameState: (actionType, actionValue) => dispatch(setGameState(actionType, actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Score)