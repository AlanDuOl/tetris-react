import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/Score.css'

function Score(props) {

    const [score, setScore] = useState(0)
    const [record, setRecord] = useState(0)
    const [level, setLevel] = useState(0)

    useEffect(() => {
        setScore(props.gameReducer.score)
        setLevel(props.gameReducer.level)
    }, [props.gameReducer.score])

    return (
        <section id="score">
            <div id="score-container">
                <div className="score-element">
                    <label htmlFor="score-current">Points:</label>
                    <output id="score-current">{score}</output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-level">Level:</label>
                    <output id="score-level">{level}</output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-record">Record:</label>
                    <output id="score-record">{record}</output>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, null)(Score)