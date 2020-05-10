import React, { useState, useEffect } from 'react'
import '../css/Blocks.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'
import { getTiles, setInitialPosition, getTimerSpeed } from '../libs/blockLib.js'
import { timerSpeeds } from '../globals.js'


function Block(props) {

    const [tiles, setTiles] = useState([])
    const [type, setType] = useState("")
    const [block, setBlock] = useState(null)
    const [timer, setTimer] = useState(null)
    const [timerSpeed, setTimerSpeed] = useState(timerSpeeds.level1)

    // When viewport change update state tiles
    useEffect(() => {
        setTiles(getTiles(props.viewportWidth))
    }, [props.viewportWidth])

    // Get block reference on its first render
    useEffect(() => {
        setBlock(document.getElementById("block"))
    }, [])

    // When block type changes update state type
    useEffect(() => {
        setType(props.type)
    }, [props.type])

    // Wnen block reference changes
    useEffect(() => {
        // If block is set, set its initial position and state timerSpeed
        if (block) {
            setInitialPosition(block, props.viewportWidth, props.viewportHeight)
            setTimerSpeed(getTimerSpeed(props.gameReducer.level))
        }
    }, [block])

    // When state gamePaused change make block stop or move  
    useEffect(() => {
        // Make block stop
        if (props.gameReducer.gamePaused) {
            clearInterval(timer)
        }
        // Make block move
        else {
            setTimer(setInterval(move, timerSpeed))
        }
    }, [props.gameReducer.gamePaused])

    // When block speed changes, set timerSpeed
    // TODO: see the best speed for speeded block
    useEffect(() => {
        setTimerSpeed(getTimerSpeed(props.blockReducer.speed))
    }, [props.blockReducer.speed])

    // When timerSpeed changes reset block speed
    useEffect(() => {
        if (timer) {
            clearInterval(timer)
        }
        setTimer(setInterval(move, timerSpeed))
    }, [timerSpeed])
    
    // If block move it downwards with current speed
    function move() {
        if (block) {
            block.style.bottom = (parseInt(block.style.bottom) - props.blockReducer.speed) + "px"
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