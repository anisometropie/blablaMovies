import { combineEpics } from 'redux-observable'
import { fetchMovies } from 'corelogic/useCases/fetchMovies'
import { voteForMovie } from 'corelogic/useCases/voteForMovie'
import { registerUser } from 'corelogic/useCases/registerUser'

const rootEpic = combineEpics(fetchMovies, voteForMovie, registerUser)

export default rootEpic
