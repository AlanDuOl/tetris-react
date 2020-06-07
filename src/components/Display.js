import React from "react"
import '../css/Display.css'

function Display() {

    return (
        <main id="display">
            <canvas id="display-viewport" width="200" height="340">
                Browser version does not support the game
            </canvas>
        </main>
    )
}

export default Display