import React from 'react'
import '../css/Menu.scss'
import { connect } from 'react-redux'
import { setGameState } from '../actions/gameActions.js'
import { actionType } from '../globals.js'
import { gameStart, gameFinish, gamePause, gameResetInfo } from '../libs/game.js'


function Menu(props) {

    // Game Start/End
    function toggleStart() {
        try {
            if (!props.gameReducer.gameOn) {
                props.setGameState(actionType.gameOn, true)
                gameStart(props.setTimer, props.ctx2D, props.canvas, props.wall, props.setWall, props.block, props.setBlock, props.gameReducer, props.setGameState)
            }
            else if (props.gameReducer.gameOn) {
                // TODO: implement custom window for confirm
                let quit = window.confirm("Finish?")
                if (quit) {
                    props.setGameState(actionType.gameOn, false)
                    props.setGameState(actionType.gamePaused, false)
                    gameFinish(props.timer, props.ctx2D, props.canvas, props.block, props.setBlock, props.setWall)
                    gameResetInfo(props.setGameState)
                }
            }
        }
        catch(e) {
            console.error(e.message)
        }
    }
    // Game Pause/Resume
    function togglePause() {
        try {
            if (!props.gameReducer.gamePaused && props.gameReducer.gameOn) {
                props.setGameState(actionType.gamePaused, true)
                gamePause(props.timer)
            }
            else if(props.gameReducer.gamePaused) {
                // TODO: implement custom window for paused
                props.setGameState(actionType.gamePaused, false)
                gameStart(props.setTimer, props.ctx2D, props.canvas, props.wall, props.setWall, props.block, props.setBlock, props.gameReducer, props.setGameState)
            }
        }
        catch(e) {
            console.error(e.message)
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