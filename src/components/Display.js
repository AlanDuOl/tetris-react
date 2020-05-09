import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Block from './Block'
import '../css/Display.css'
import { blockTypes, NUM_BLOCK_TYPES } from '../globals.js'
import { setBlockState } from '../actions/blockActions'
import { setGameState } from '../actions/gameActions'


function Display(props) {

    // const viewport = React.useRef()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    // const [blockType, setBlockType] = useState("")

    useEffect(() => {
        let viewport = document.getElementById("display-viewport")
        setWidth(viewport.offsetWidth)
        setHeight(viewport.offsetHeight)
        // setBlockType(setBlock())
    }, [])

    return (
        <main id="display">
            <section id="display-viewport">
                {props.gameReducer.gameOn ? restartBlock(getBlockType(), width, height) : null }
            </section>
        </main>
    )
}

function restartBlock(type, viewportWidth, viewportHeight) {
    return (<Block type={type} viewportWidth={viewportWidth} viewportHeight={viewportHeight} />)
}

function getBlockType() {

    let blockType = ""
    let blockNumber = getBlockNumber()

    // Return the blockType that is going to be used as a css class to define the block layout
    if (blockNumber) {
        switch(blockNumber) {
            case 1:
                blockType = blockTypes.one.name
                return blockType
            case 2:
                blockType = blockTypes.two.name
                return blockType
            case 3:
                blockType = blockTypes.three.name
                return blockType
            case 4:
                blockType = blockTypes.four.name
                return blockType
            case 5:
                blockType = blockTypes.five.name
                return blockType
            case 6:
                blockType = blockTypes.six.name
                return blockType
            case 7:
                blockType = blockTypes.seven.name
                return blockType
            default:
                console.log("Unknown block number...")
                break
        }
    }
    else {
        console.log("Block number is missing...")
    }
    
}

// Return the block number used to define the block type
function getBlockNumber() {
    let blockNum = Math.round(Math.random() * NUM_BLOCK_TYPES)
    return blockNum
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setBlockState: (actionType, actionValue) => dispatch(setBlockState(actionType, actionValue)),
    setGameState: (actionType, actionValue) => dispatch(setGameState(actionType, actionValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Display)