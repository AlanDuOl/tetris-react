import { combineReducers } from 'redux'
import blockReducer from './blockReducer.js'
import gameReducer from './gameReducer.js'

// Join reducers to create a single entry point for the store in index.js
export default combineReducers({
    blockReducer,
    gameReducer
})