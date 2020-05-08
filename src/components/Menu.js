import React from 'react'
import '../css/Menu.scss'

function Menu() {
    return (
        <section id="menu">
            <div className="menu-element" id="menu-element-1">
                <button type="button" className="menu-btn" id="menu-btn-start">Start</button>
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

export default Menu