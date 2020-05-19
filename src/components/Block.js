import React, { useState, useEffect } from 'react'
import '../css/Blocks.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'
import { getTiles, setBlockInitialPosition, getTimerSpeed, blockMove, checkRotationCollision } from '../libs/blockLib.js'
import { BLOCK_INITIAL_SPEED, blockMoveDirections } from '../globals.js'


function Block(props) {

    const [tiles, setTiles] = useState([])
    const [type, setType] = useState("")
    const [self, setSelf] = useState(null)
    const [timer, setTimer] = useState(0)
    const [timerSpeed, setTimerSpeed] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [rotation, setRotation] = useState(0)
    // const [bottom, setBottom]

    // Init stuff that does not need a reference to the block element
    useEffect(() => {
        setSelf(document.getElementById("block"))
        setType(props.type)
        setTiles(getTiles(props.viewportWidth))
        props.setBlockState("SET_BLOCK_SPEED", BLOCK_INITIAL_SPEED)
    }, [])

    // Init stuff that needs a reference to the block
    useEffect(() => {
        if (self) {
            setBlockInitialPosition(self, props.viewportWidth, props.viewportHeight)
        }
    }, [self])

    // When store state gamePaused change make block stop or move  
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
        // If speed is bigger than initial speed, change timer speed
        if (speed > BLOCK_INITIAL_SPEED) {
            setTimerSpeed(getTimerSpeed(speed))
        }
        // Speed will always change on first render and set timeSpeed to current game level
        else {
            setTimerSpeed(getTimerSpeed(props.gameReducer.level))
        }
    }, [speed])

    // When timerSpeed changes reset block speed
    useEffect(() => {
        if (timer) {
            clearInterval(timer)
        }
        setTimer(setInterval(move, timerSpeed))
    }, [timerSpeed])

    // Move block
    useEffect(() => {
        if (self && props.blockReducer.moveDir !== blockMoveDirections.none) {
            blockMove(props.blockReducer.moveDir, self, props.viewportWidth)
            props.setBlockState("SET_BLOCK_MOVE", blockMoveDirections.none)
        }
    }, [props.blockReducer.moveDir])

    // Set block by rotation
    useEffect(() => {
        setRotation(props.blockReducer.rotation)
    }, [props.blockReducer.rotation])

    // Check for collision on rotation
    useEffect(() => {
        checkRotationCollision(self, props.viewportWidth)
    }, [rotation])
    
    // Move downwards with current speed
    function move() {
        if (self) {
            let currentBottom = parseFloat(self.style.bottom)
            if (currentBottom > 0) {
                self.style.bottom = `${parseFloat(self.style.bottom) - speed}px`
            }
            else {
                clearInterval(timer)
                self.style.bottom = "0px"
            }
        }
    }

    return (
        <div id="block" className={`${type}-${rotation}`}>
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