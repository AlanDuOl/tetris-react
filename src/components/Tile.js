import React from 'react'
import '../css/Tile.css'
import { NUM_TILES_WIDTH } from '../globals'

function Tile(props) {
    
    const [dim, setDim] = React.useState(0)

    React.useEffect(() => {
        setDim(getTileWidth(props.viewportWidth))
    }, [props.viewportWidth])

    return (
        <div className="tile" id={props.id} style={{width:dim, height:dim}}></div>
    )
}

function getTileWidth(viewportWidth) {
    let tileWidth = viewportWidth / NUM_TILES_WIDTH
    return tileWidth
}

export default Tile