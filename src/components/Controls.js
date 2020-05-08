import React from 'react'
import '../css/Controls.scss'

function Controls() {
    return (
        <section id="controls">
            <div id="controls-line-1" className="controls-line">
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-turn">&#8635;</button>
                </div>
            </div>
            <div id="controls-line-2" className="controls-line">
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-left">&#8592;</button>
                </div>
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-right">&#8594;</button>
                </div>
            </div>
            <div id="controls-line-3" className="controls-line">
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-down">&#8595;</button>
                </div>
            </div>
        </section>
    )
}

export default Controls