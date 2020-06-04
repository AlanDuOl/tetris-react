import React from 'react'
import '../css/Menu.scss'
import { connect } from 'react-redux'
import { setGameState } from '../actions/gameActions.js'
import { actionType } from '../globals.js'

function Menu(props) {

    // Start the game and create block
    function toggleStart(evt) {
        try {
            if (!props.gameReducer.gameOn) {
                props.setGameState(actionType.gameOn, true)
            }
            else if (props.gameReducer.gameOn) {
                // TODO: implement custom window for confirm
                let quit = window.confirm("Finish?")
                if (quit) {
                    props.setGameState(actionType.gameOn, false)
                    props.setGameState(actionType.gamePaused, false)
                }
            }
        }
        catch(e) {
            console.log(e.message)
        }
    }

    function togglePause(evt) {
        try {
            if (!props.gameReducer.gamePaused && props.gameReducer.gameOn) {
                props.setGameState(actionType.gamePaused, true)
            }
            else if(props.gameReducer.gamePaused) {
                // TODO: implement custom window for paused
                props.setGameState(actionType.gamePaused, false)
            }
        }
        catch(e) {
            console.log(e.message)
        }
    }

    return (
        <section id="menu">
            <div className="menu-element">
                <button type="button" className="menu-btn" id="menu-btn-start" onClick={toggleStart}>{ props.gameReducer.gameOn ? "Finish" : "Start" }</button>
            </div>
            <div className="menu-element">
                <button type="button" className="menu-btn" id="menu-btn-pause" onClick={togglePause}>{ props.gameReducer.gamePaused ? "Resume" : "Pause" }</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)