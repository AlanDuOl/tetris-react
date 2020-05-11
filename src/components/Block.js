import React, { useState, useEffect } from 'react'
import '../css/Blocks.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'
import { getTiles, setInitialPosition, getTimerSpeed } from '../libs/blockLib.js'
import { timerSpeeds, BLOCK_DELTA_SPEED } from '../globals.js'


function Block(props) {

    const [tiles, setTiles] = useState([])
    const [type, setType] = useState("")
    const [self, setSelf] = useState(null)
    const [timer, setTimer] = useState(0)
    const [timerSpeed, setTimerSpeed] = useState(0)
    const [speed, setSpeed] = useState(0)

    // Get block reference on its first render
    useEffect(() => {
        setSelf(document.getElementById("block"))
    }, [])

    // Wnen block reference changes init local state
    useEffect(() => {
        if (self) {
            init(self)
        }
    }, [self])

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

    // Update local state speed
    useEffect(() => {
        setSpeed(props.blockReducer.speed)
    }, [props.blockReducer.speed])

    // When block speed changes, set timerSpeed
    useEffect(() => {
        if (speed > BLOCK_DELTA_SPEED) {
            setTimerSpeed(getTimerSpeed(speed))
        }
    }, [speed])

    // When timerSpeed changes reset block speed
    useEffect(() => {
        if (timer) {
            clearInterval(timer)
        }
        setTimer(setInterval(move, timerSpeed))
    }, [timerSpeed])

    // Init local state and reset store state block speed
    function init() {
        setType(props.type)
        setTiles(getTiles(props.viewportWidth))
        setInitialPosition(self, props.viewportWidth, props.viewportHeight)
        setTimerSpeed(timerSpeeds.level1)
        setSpeed(BLOCK_DELTA_SPEED)
        setBlockState("SET_BLOCK_SPEED", BLOCK_DELTA_SPEED)
    }
    
    // Move downwards with current speed
    function move() {
        if (self) {
            self.style.bottom = (parseInt(self.style.bottom) - speed) + "px"
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