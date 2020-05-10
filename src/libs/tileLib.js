import React from 'react'
import Tile from '../components/Tile'
import { NUM_TILES, BLOCK_INITIAL_SPEED } from '../globals.js'

export function getTiles(viewportWidth) {
    let tiles = []
    for (let i = 0; i < NUM_TILES; i++) {
        tiles.push(<Tile key={i} id={"tile-" + i} viewportWidth={viewportWidth} />)
    }
    return tiles
}

export const move = block => {
    block.style.bottom = (parseInt(block.style.bottom) - BLOCK_INITIAL_SPEED) + "px"
}

export const setInitialPosition = (block, viewportWidth, viewportHeight) => {
    block.style.left = (viewportWidth / 2 - (viewportWidth / 12)) + "px"
    block.style.bottom = `${viewportHeight}px`
}