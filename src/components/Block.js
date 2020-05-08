import React from 'react'
import Tile from './Tile'
import { NUM_TILES } from '../globals.js'
import '../css/Blocks.scss'
import { connect } from 'react-redux'
import { setBlockState } from '../actions/blockActions.js'


function Block(props) {

    const [tiles, setTiles] = React.useState([])
    const [type, setType] = React.useState("")
    // const [on, setOn] = React.useState(false)
    const [el, setEl] = React.useState(null)

    React.useEffect(() => {
        // When viewport changes get info for the new sizes
        setTiles(getTiles(props.viewportWidth))
        setEl(document.getElementById("block"))
    }, [props.viewportWidth])

    React.useEffect(() => {
        // When block type changes, change state type
        setType(props.type)
    }, [props.type])

    React.useEffect(() => {
        // When el changes, change its position
        if (el) {
            if (props.type != "I") {
                el.style.left = (props.viewportWidth / 2 - (props.viewportWidth / 12)) + "px"
                el.style.bottom = `${props.viewportHeight}px`
            }
            else {
                el.style.left = (props.viewportWidth / 2 - (props.viewportWidth / 12) / 2) + "px"
                el.style.bottom = `${props.viewportHeight}px`
            }
        }
    }, [el])

    return (
        <div id="block" className={"" + type + ""}>
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