import { combineReducers } from 'redux'

import movies from './reducers/movies'

const reducers = { movies }

export default combineReducers(reducers)
