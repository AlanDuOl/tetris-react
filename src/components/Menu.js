import React from 'react'
import '../css/Menu.scss'
import { connect } from 'react-redux'
import { setGameState } from '../actions/gameActions.js'

function Menu(props) {

    // Start the game and create block
    function toggleStart(evt) {
        // console.log(evt.target)
        try {
            if (!props.gameReducer.gameOn) {
                props.setGameState("SET_GAME_ON", true)
                evt.target.textContent = "Finish"
            }
            else {
                props.setGameState("SET_GAME_ON", false)
                evt.target.textContent = "Start"
            }
        }
        catch(e) {
            console.log(e.message)
        }
    }

    return (
        <section id="menu">
            <div className="menu-element" id="menu-element-1">
                <button type="button" className="menu-btn" id="menu-btn-start" onClick={toggleStart}>Start</button>
            </div>
            <div className="menu-element" id="menu-element-2">
                <button type="button" className="menu-btn" id="menu-btn-pause">Pause</button>
            </div>
            <div className="menu-element" id="menu-element-3">
                <button type="button" className="menu-btn" id="menu-btn-save">Save</button>
            </div>
            <div className="menu-element" id="menu-element-4">
                <button type="button" className="menu-btn" id="menu-btn-load">Load</button>
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