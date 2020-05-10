import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import '../css/Display.css'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'
import { getBlock } from "../libs/blockLib"


function Display(props) {

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [block, setBlock] = useState(null)

    useEffect(() => {
        let viewport = document.getElementById("display-viewport")
        setWidth(viewport.offsetWidth)
        setHeight(viewport.offsetHeight)
    }, [])

    useEffect(() => {
        if (props.gameReducer.gameOn || props.blockReducer.restart) {
            setBlock(getBlock(width, height))
        }
        else {
            setBlock(null)
        }
    }, [props.gameReducer.gameOn, props.blockReducer.restart])

    return (
        <main id="display">
            <section id="display-viewport">
                { block }
            </section>
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