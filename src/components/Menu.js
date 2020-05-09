import React from 'react'
import '../css/Menu.scss'
import { connect } from 'react-redux'
import { setGameState } from '../actions/gameActions.js'

function Menu(props) {

    // Start the game and create block
    function start() {
        // props.setGameOn(true)
    }

    return (
        <section id="menu">
            <div className="menu-element" id="menu-element-1">
                <button type="button" className="menu-btn" id="menu-btn-start" onClick={start}>Start</button>
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

const mapDispatchToProps = dispatch => ({
    setGameState: gameOn => dispatch(setGameState(gameOn))
})

export default connect(null, mapDispatchToProps)(Menu)