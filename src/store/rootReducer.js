import { combineReducers } from 'redux'

import movies from './reducers/movies'
import loggedUser from './reducers/loggedUser'

const reducers = { loggedUser, movies }

export default combineReducers(reducers)
