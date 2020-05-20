import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { getBlock } from "../libs/blockLib"
import { NUM_TILES_WIDTH } from '../globals.js'


function Display(props) {

    // const [width, setWidth] = useState(0)
    // const [height, setHeight] = useState(0)
    // const [block, setBlock] = useState(null)
    const [canvas, setCanvas] = useState(null)
    const [ctx2D, setctx2D] = useState(null)
    // const [canvasRect, setCanvasRect] = useState(0)
    const [timer, setTimer] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setCanvas(document.getElementById("display-viewport"))
    }, [])

    useEffect(() => {
        if (canvas) {
            setctx2D(canvas.getContext("2d"))
            setPosition({ x: canvas.width / 2, y: 0 })
        }
    }, [canvas])

    useEffect(() => {
        if (props.gameReducer.gameOn && !props.gameReducer.gamePaused) {
            setTimer(setInterval(draw, 50))
        }
        else {
            clearInterval(timer)
        }
    }, [props.gameReducer.gameOn, props.gameReducer.gamePaused])

    const draw = () => {
        if (ctx2D) {
            ctx2D.clearRect(0, 0, canvas.width, canvas.height)
            let tileDim = canvas.width / NUM_TILES_WIDTH
            ctx2D.beginPath()
            ctx2D.rect(position.x, position.y, tileDim, tileDim)
            ctx2D.fillStyle = "grba(0, 0, 255, 0.5)"
            ctx2D.fill()
            ctx2D.closePath()
            setPosition({ x: position.x, y: position.y++ })
        }
    }

    return (
        <main id="display">
            <canvas id="display-viewport" width="200" height="300">
                Element not suported by this browser
            </canvas>
        </main>
    )
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setBlockState: (actionType, actionValue) => dispatch(setBlockState(actionType, actionValue)),
    setGameState: (actionType, actionValue) => dispatch(setGameState(actionType, actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Display)