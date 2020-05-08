import React from 'react'
import '../css/Score.css'

function Score() {
    return (
        <section id="score">
            <div id="score-container">
                <div className="score-element">
                    <label htmlFor="score-current">Points:</label>
                    <output id="score-current"></output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-level">Level:</label>
                    <output id="score-level"></output>
                </div>
                <div className="score-element">
                    <label htmlFor="score-record">Record:</label>
                    <output id="score-record"></output>
                </div>
            </div>
        </section>
    )
}

export default Score