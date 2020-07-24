import { combineReducers } from 'redux'

import movies from './movies/reducer'

const reducers = { movies }

export default combineReducers(reducers)
