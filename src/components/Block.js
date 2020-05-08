import React from 'react'
import Tile from './Tile'
import { NUM_TILES } from '../globals.js'
import '../css/Blocks.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'

function Block(props) {

    const [tiles, setTiles] = React.useState([])
    const [type, setType] = React.useState("")

    React.useEffect(() => {
        setTiles(getTiles(props.viewportWidth))
    }, [props.viewportWidth])

    React.useEffect(() => {
        setType(props.type)
    }, [props.type])

    const setInitialPos = () => {
        console.log("pos: " + this.style.top)
    }

    return (
        <div className={"" + type + ""} onLoad={setInitialPos}>
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

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setBlockState: (actionType, stateValue) => dispatch(setBlockState(actionType, stateValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(Block)