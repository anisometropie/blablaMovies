import { combineEpics } from 'redux-observable'
import { fetchMovies } from 'corelogic/useCases/fetchMovies'
import { addMovie } from 'corelogic/useCases/addMovie'
import { voteForMovie } from 'corelogic/useCases/voteForMovie'
import { registerUser } from 'corelogic/useCases/registerUser'
import { loginUser } from 'corelogic/useCases/loginUser'

const rootEpic = combineEpics(
  fetchMovies,
  addMovie,
  voteForMovie,
  registerUser,
  loginUser
)

export default rootEpic
