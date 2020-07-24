import { createRequestActions, generateCode } from 'utils/requestActions'

export const {
  FETCH_MOVIES_REQUESTED,
  FETCH_MOVIES_SUCCEEDED,
  FETCH_MOVIES_FAILED,
  fetchMoviesRequested,
  fetchMoviesSucceeded,
  fetchMoviesFailed
} = createRequestActions('FETCH_MOVIES')

export const defaultState = []
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCEEDED:
      return action.payload.movies
    default:
      return state
  }
}

const getState = state => state.movies
const getAllUsers = state => getState(state).allUsers

export const selectors = {
  getState,
  getAllUsers
}
