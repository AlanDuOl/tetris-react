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

    useEffect(() => {
        // When viewport changes get info for the new sizes
        setTiles(getTiles(props.viewportWidth))
    }, [props.viewportWidth])

    useEffect(() => {
        setBlock(document.getElementById("block"))
    }, [])

    useEffect(() => {
        // When block type changes, change state type
        setType(props.type)
    }, [props.type])

    useEffect(() => {
        try {
            if (block) {
                setInitialPosition(block, props.viewportWidth, props.viewportHeight)
                console.log(props.blockReducer.speed)
                // setTimer(setInterval(move, 500))
            }
        }
        catch(e) {
            console.log(e.message)
        }
        finally {
            clearInterval(timer)
        }
        
    }, [block])
    
    const move = () => {
        block.style.bottom = (parseInt(block.style.bottom) - props.blockReducer.speed) + "px"
        timerCounter++
        if (timerCounter > 100) {
            clearInterval(timer)
        }
    }

    // React.useEffect(() => {
    //     if (props.gameReducer.gamePaused) {
    //         clearInterval(timer)
    //     }
    //     else {
    //         // setTimer(setInterval(move, 500))
    //     }
    // }, [props.gameReducer.gamePaused])
    

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