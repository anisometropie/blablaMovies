import { combineEpics } from 'redux-observable'
import { fetchMovies } from 'corelogic/useCases/fetchMovies'
import { voteForMovie } from 'corelogic/useCases/voteForMovie'

const rootEpic = combineEpics(fetchMovies, voteForMovie)

export default rootEpic
