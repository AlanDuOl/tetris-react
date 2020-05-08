import React from 'react'
import Tile from './Tile'
import { NUM_TILES } from '../globals.js'
import '../css/Blocks.scss'

function Block(props) {

    const [tiles, setTiles] = React.useState([])
    const [type, setType] = React.useState("")

    React.useEffect(() => {
        setTiles(getTiles(props.viewportWidth))
    }, [props.viewportWidth])

    React.useEffect(() => {
        setType(props.type)
    }, [props.type])

    return (
        <div className={"" + type + ""}>
            {tiles}
        </div>
    )
}

function getTiles(viewportWidth) {
    let tiles = []
    for (let i = 0; i < NUM_TILES; i++) {
        tiles.push(<Tile key={i} id={"tile-" + i} viewportWidth={viewportWidth} />)
    }
    return tiles
}

export default Block