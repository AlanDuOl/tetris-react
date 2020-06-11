import React from 'react'
import { connect } from 'react-redux'
import '../css/Score.css'


function Score(props) {

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

export default connect(mapStateToProps, null)(Score)