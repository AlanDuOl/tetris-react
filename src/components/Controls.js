import React from 'react'
import '../css/Controls.scss'
import { connect } from 'react-redux'

function Controls(props) {

    function rotate() {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            props.game.block.rotate(props.game.canvas, props.game.wall)
        }
    }

    const blockSpeedUp = () => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            props.game.block.newSpeed()
        }
    }

    const blockMoveLeft = () => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            props.game.block.moveLeft(props.game.canvas, props.game.wall)
        }
    }

    const blockMoveRight = () => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            props.game.block.moveRight(props.game.canvas, props.game.wall)
        }
    }

    return (
        <section id="controls">
            <div id="controls-line-1" className="controls-line">
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-turn" onClick={rotate}>&#8635;</button>
                </div>
            </div>
            <div id="controls-line-2" className="controls-line">
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-left" onClick={blockMoveLeft}>&#8592;</button>
                </div>
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-right" onClick={blockMoveRight}>&#8594;</button>
                </div>
            </div>
            <div id="controls-line-3" className="controls-line">
                <div className="controls-element">
                    <button type="button" className="controls-btn" id="controls-down" onClick={blockSpeedUp}>&#8595;</button>
                </div>
            </div>
        </section>
    )

}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, null)(Controls)