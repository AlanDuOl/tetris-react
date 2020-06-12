import React from 'react'
import '../css/Menu.scss'
import { connect } from 'react-redux'
import { setGameState } from '../actions/gameActions.js'


function Menu(props) {

    // Game Start/End
    function toggleStart() {
        try {
            if (!props.gameReducer.gameOn) {
                props.game.start()
            }
            else if (props.gameReducer.gameOn) {
                // TODO: implement custom window for confirm
                let quit = window.confirm("Finish?")
                if (quit) {
                    props.game.finish()
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
                props.game.stop()
            }
            else if(props.gameReducer.gamePaused) {
                // TODO: implement custom window for paused
                props.game.start()
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

export default connect(mapStateToProps, null)(Menu)