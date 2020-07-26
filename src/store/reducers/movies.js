import { createRequestActions, generateCode } from 'utils/requestActions'

export const {
  FETCH_MOVIES_REQUESTED,
  FETCH_MOVIES_SUCCEEDED,
  FETCH_MOVIES_FAILED,
  fetchMoviesRequested,
  fetchMoviesSucceeded,
  fetchMoviesFailed
} = createRequestActions('FETCH_MOVIES')

export const {
  VOTE_FOR_MOVIE_REQUESTED,
  VOTE_FOR_MOVIE_SUCCEEDED,
  VOTE_FOR_MOVIE_FAILED,
  voteForMovieRequested,
  voteForMovieSucceeded,
  voteForMovieFailed,
  voteForMovieRequestStateReducer
} = createRequestActions('VOTE_FOR_MOVIE')

export const {
  ADD_MOVIE_REQUESTED,
  ADD_MOVIE_SUCCEEDED,
  ADD_MOVIE_FAILED,
  addMovieRequested,
  addMovieSucceeded,
  addMovieFailed,
  addMovieRequestStateReducer
} = createRequestActions('ADD_MOVIE')

export const defaultState = []
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCEEDED:
    case VOTE_FOR_MOVIE_SUCCEEDED:
    case ADD_MOVIE_SUCCEEDED:
      return action.payload.movies
    default:
      return state
  }
}

const getState = state => state.movies
const getAllMoviesTitles = state => getState(state).map(m => m.title)

export const selectors = {
  getState,
  getAllMoviesTitles
}
