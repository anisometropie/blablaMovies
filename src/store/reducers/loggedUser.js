import { createRequestActions, generateCode } from 'utils/requestActions'
import { VOTE_FOR_MOVIE_SUCCEEDED } from 'store/reducers/movies'

export const {
  REGISTER_USER_REQUESTED,
  REGISTER_USER_SUCCEEDED,
  REGISTER_USER_FAILED,
  registerUserRequested,
  registerUserSucceeded,
  registerUserFailed,
  registerUserRequestStateReducer
} = createRequestActions('REGISTER_USER')

export const {
  LOGIN_USER_REQUESTED,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
  loginUserRequested,
  loginUserSucceeded,
  loginUserFailed,
  loginUserRequestStateReducer
} = createRequestActions('LOGIN_USER')

const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const defaultState = {}
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case REGISTER_USER_SUCCEEDED:
    case LOGIN_USER_SUCCEEDED:
      return action.payload.user
    case LOGIN_USER_FAILED:
    case LOGOUT_USER:
      return defaultState
    case VOTE_FOR_MOVIE_SUCCEEDED:
      const { movieId } = action.payload
      const previousVotes = state.votes ?? []
      return { ...state, votes: [...previousVotes, { movieId }] }
    default:
      return state
  }
}

const getState = state => state.loggedUser

export const selectors = {
  getState
}
