import { createRequestActions } from 'utils/requestActions'
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

export const defaultState = { infos: {}, requestState: '' }
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case REGISTER_USER_SUCCEEDED:
      return {
        infos: action.payload.user,
        requestState: registerUserRequestStateReducer(state, action),
        errorMessage: ''
      }
    case LOGIN_USER_SUCCEEDED:
      return {
        infos: action.payload.user,
        requestState: loginUserRequestStateReducer(state, action),
        errorMessage: ''
      }
    case LOGIN_USER_FAILED:
      return {
        ...defaultState,
        requestState: loginUserRequestStateReducer(state, action),
        errorMessage: action.meta.error
      }
    case LOGOUT_USER:
      return defaultState
    case VOTE_FOR_MOVIE_SUCCEEDED:
      const { movieId } = action.payload
      const previousVotes = state.infos.votes ?? []
      return {
        ...state,
        infos: { ...state.infos, votes: [...previousVotes, { movieId }] }
      }
    default:
      return state
  }
}

const getState = state => state.loggedUser
const getUserInfos = state => getState(state).infos
const getRequestState = state => getState(state).requestState
const getErrorMessage = state => getState(state).errorMessage

export const selectors = {
  getState,
  getUserInfos,
  getRequestState,
  getErrorMessage
}
