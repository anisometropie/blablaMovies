import { combineEpics } from 'redux-observable'
import { fetchMovies } from 'corelogic/useCases/fetchMovies'

const rootEpic = combineEpics(fetchMovies)

export default rootEpic
