import React from 'react'
import '../css/Controls.scss'
import { connect } from 'react-redux'
import { blockMoveDirection } from '../globals.js'
import { blockMoveSide, blockNewSpeed, blockRotate } from '../libs/block.js'

function Controls(props) {

    function rotate() {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            blockRotate(props.block, props.setBlock, props.wall, props.canvas)
        }
    }

    const blockSpeedUp = () => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            blockNewSpeed(props.block, props.setBlock)
        }
    }

    const blockMoveLeft = () => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            blockMoveSide(props.canvas, props.wall, props.block, props.setBlock, blockMoveDirection.left)
        }
    }

    const blockMoveRight = () => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            blockMoveSide(props.canvas, props.wall, props.block, props.setBlock, blockMoveDirection.right)
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