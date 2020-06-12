import React from "react"
import '../css/Display.css'
import { connect } from 'react-redux'
import { setGameState } from '../actions/gameActions.js'

function Display(props) {

    function clearGame() {
        // gameFinish(props.timer, props.ctx2D, props.canvas, props.setBlock, props.setWall, props.setGameState)
    }

    return (
        <main id="display">
            <canvas id="display-viewport" width="200" height="340">
                Browser version does not support the game
            </canvas>
        </main>
    )
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setGameState: (actionType, actionValue) => dispatch(setGameState(actionType, actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Display)