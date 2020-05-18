import React from "react";
import Block from '../components/Block';
import Tile from '../components/Tile'
import { blockTypes, BLOCK_NUM_TILES, NUM_TILES_WIDTH, BLOCK_DELTA_SPEED, timerSpeeds, BLOCK_DELTA_ROTATION } from '../globals.js'

export function getBlock(viewportWidth, viewportHeight) {
    let blockType = getBlockType();
    return (<Block type={blockType} viewportWidth={viewportWidth} viewportHeight={viewportHeight} />);
}

export function getTiles(viewportWidth) {
    let tiles = []
    for (let i = 0; i < BLOCK_NUM_TILES; i++) {
        tiles.push(<Tile key={i} id={"tile-" + i} viewportWidth={viewportWidth} />)
    }
    return tiles
}

export const setBlockInitialPosition = (block, viewportWidth, viewportHeight) => {
    if (block) {
        let tileWidth = viewportWidth / NUM_TILES_WIDTH
        block.style.left = `${tileWidth * NUM_TILES_WIDTH / 2}px`
        block.style.bottom = `${viewportHeight}px`
    }
}

export const blockMoveLeft = (block, viewportWidth) => {
    if (block) {
        let tileWidth = parseFloat(viewportWidth / NUM_TILES_WIDTH)
        let blockNewLeft = parseFloat(block.style.left) - tileWidth
        if (blockNewLeft > 0) {
            block.style.left = `${parseFloat(block.style.left) - tileWidth}px`
        }
    }
}

export const blockMoveRight = (block, viewportWidth) => {
    if (block) {
        let blockRect = block.getBoundingClientRect()
        let tileWidth = parseFloat(viewportWidth / NUM_TILES_WIDTH)
        let blockCurrentRight = parseFloat(block.style.left) + blockRect.width
        let blockNewRight = blockCurrentRight + tileWidth
        if (blockNewRight < viewportWidth) {
            block.style.left = `${parseFloat(block.style.left) + tileWidth}px`
        }
    }
}

export const blockNewRotation = currentRotation => {
    let rotation = currentRotation
    if (currentRotation >= 270) {
        rotation = 0
    }
    else {
        rotation += BLOCK_DELTA_ROTATION
    }
    return rotation
}

export const checkSideMove = (block, viewportWidth) => {
    
}

export function blockNewSpeed(currentSpeed) {
    let newSpeed = currentSpeed + BLOCK_DELTA_SPEED
    return newSpeed
}

export function getTimerSpeed(gameLevel) {
    switch (gameLevel) {
        case 1:
            return timerSpeeds.level1
        case 2:
            return timerSpeeds.level2
        case 3:
            return timerSpeeds.level3
        case 4:
            return timerSpeeds.level4
        default:
            return timerSpeeds.speedUp
    }
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
