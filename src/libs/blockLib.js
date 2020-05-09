import React from "react";
import Block from '../components/Block';
import { blockTypes } from '../globals.js'

export function getBlock(viewportWidth, viewportHeight) {
    let blockType = getBlockType();
    return (<Block type={blockType} viewportWidth={viewportWidth} viewportHeight={viewportHeight} />);
}

function getBlockType() {

    let blockType = ""
    let blockNumber = getBlockNumber()

    // Return the blockType that is going to be used as a css class to define the block layout
    try {
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
                console.log("Unknown block number: " + blockNumber)
                break
        }
    }
    catch(e) {
        console.log(e.message)
    }
    
}

// Return the block number used to define the block type
function getBlockNumber() {
    const min = 1, max = 6
    let blockNum = Math.round(Math.random() * max) + min
    return blockNum
}
