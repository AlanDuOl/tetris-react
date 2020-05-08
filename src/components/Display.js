import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Block from './Block'
import '../css/Display.css'
import { blockTypes, NUM_BLOCK_TYPES } from '../globals.js'


function Display() {

    // const viewport = React.useRef()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [blockType, setBlockType] = useState("")

    useEffect(() => {
        let viewport = document.getElementById("display-viewport")
        setWidth(viewport.offsetWidth)
        setHeight(viewport.offsetHeight)
        viewport.addEventListener("resize", evt => {
            setWidth(evt.target.offsetWidth)
            setHeight(viewport.offsetHeight)
        })

    }, [window.offsetWidth])

    // Need to change second parameter for when new block event is fired
    useEffect(() => {
        setBlockType(setBlock())
    }, [])

    return (
        <main id="display">
            <section id="display-viewport">
                <Block type={blockType} viewportWidth={width} viewportHeight={height} />
            </section>
        </main>
    )
}

function setBlock() {

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

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {

}

export default Display