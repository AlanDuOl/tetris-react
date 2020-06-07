import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/Score.css'
import { gameInitInfo, gameUpdateInfo } from '../libs/game.js'
import { setGameState } from '../actions/gameActions'
import { GAME_INITIAL_LEVEL } from '../globals'

function Score(props) {

    const [score, setScore] = useState(0)
    const [record, setRecord] = useState(0)
    const [level, setLevel] = useState(GAME_INITIAL_LEVEL)

    useEffect(() => {
        gameInitInfo(props.setGameState)
    }, [props.setGameState])

    useEffect(() => {
        gameUpdateInfo(props.gameReducer.score, setScore, props.gameReducer.level, setLevel, props.gameReducer.record, setRecord, props.setGameState)
    }, [props.gameReducer.score, props.gameReducer.level, props.gameReducer.record, props.setGameState])

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