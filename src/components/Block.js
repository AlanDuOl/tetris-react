import React, { useState, useEffect } from 'react'
import '../css/Blocks.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'
import { getTiles, setInitialPosition } from '../libs/blockLib.js'


function Block(props) {

    const [tiles, setTiles] = useState([])
    const [type, setType] = useState("")
    const [block, setBlock] = useState(null)
    const [timer, setTimer] = useState(null)

    let timerCounter = 0

    // When viewport changes get info for the new sizes
    useEffect(() => {
        setTiles(getTiles(props.viewportWidth))
    }, [props.viewportWidth])

    // Get block reference on its first render
    useEffect(() => {
        setBlock(document.getElementById("block"))
    }, [])

    // When block type changes, change state type
    useEffect(() => {
        setType(props.type)
    }, [props.type])

    // Wnen block reference changes
    useEffect(() => {
        // If block is set, set its position and make it move
        if (block) {
            setInitialPosition(block, props.viewportWidth, props.viewportHeight)
            setTimer(setInterval(move, 500))
        }
    }, [block])

    // If state gamePaused change make block stop or move  
    useEffect(() => {
        if (props.gameReducer.gamePaused) {
            clearInterval(timer)
        }
        else {
            setTimer(setInterval(move, 500))
        }
    }, [props.gameReducer.gamePaused])
    
    const move = () => {
        // If block move it downwards with current speed
        if (block) {
            block.style.bottom = (parseInt(block.style.bottom) - props.blockReducer.speed) + "px"
        }
        // Clear timer after more than 100 iteractions
        timerCounter++
        if (timerCounter > 100) {
            clearInterval(timer)
        }
    }

    return (
        <div id="block" className={"" + type + ""}>
            {tiles}
        </div>
    )
}




const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setBlockState: (actionType, stateValue) => dispatch(setBlockState(actionType, stateValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Block)