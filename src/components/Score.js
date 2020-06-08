import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/Score.css'
import { gameInitInfo, gameUpdateInfo } from '../libs/game.js'
import { setGameState } from '../actions/gameActions'

function Score(props) {

    useEffect(() => {
        gameInitInfo(props.setGameState)
    }, [props.setGameState])

    useEffect(() => {
        gameUpdateInfo(props.gameReducer.score, props.gameReducer.level, props.gameReducer.record, props.setGameState)
    }, [props.gameReducer.score, props.gameReducer.level, props.gameReducer.record, props.setGameState])

    return (
        <section id="score">
            <div id="score-container">
                <div className="score-element">
                    <label htmlFor="score-current">Score:</label>
                    <output id="score-current"> {props.gameReducer.score}</output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-level">Level:</label>
                    <output id="score-level"> {props.gameReducer.level}</output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-record">Record:</label>
                    <output id="score-record"> {props.gameReducer.record}</output>
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