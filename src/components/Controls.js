import React from 'react'
import '../css/Controls.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'
import { blockNewSpeed, blockNewRotation } from '../libs/blockLib.js'

function Controls(props) {

    
    function rotate() {
        if (props.gameReducer.gameOn) {
            props.setBlockState("SET_BLOCK_ROTATION", blockNewRotation(props.blockReducer.rotation))
        }
    }

    const blockSpeedUp = () => {
        if (props.gameReducer.gameOn) {
            props.setBlockState("SET_BLOCK_SPEED", blockNewSpeed(props.blockReducer.speed))
        }
    }

    const blockMoveLeft = () => {
        if (props.gameReducer.gameOn) {
            props.setBlockState("SET_BLOCK_MOVE_LEFT", true)
        }
    }

    const blockMoveRight = () => {
        if (props.gameReducer.gameOn) {
            props.setBlockState("SET_BLOCK_MOVE_RIGHT", true)
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

const mapDispatchToProps = dispatch => ({
    setBlockState: (actionType, stateValue) => dispatch(setBlockState(actionType, stateValue)),
    // setBlockOn: actionValue => dispatch(setBlockOn(actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)