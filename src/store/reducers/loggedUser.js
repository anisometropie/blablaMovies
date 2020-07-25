import { createRequestActions, generateCode } from 'utils/requestActions'

export const {
  REGISTER_USER_REQUESTED,
  REGISTER_USER_SUCCEEDED,
  REGISTER_USER_FAILED,
  registerUserRequested,
  registerUserSucceeded,
  registerUserFailed,
  registerUserRequestStateReducer
} = createRequestActions('REGISTER_USER')

export const defaultState = {}
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case REGISTER_USER_SUCCEEDED:
      return action.payload.user
    default:
      return state
  }
}

const getState = state => state.loggedUser

export const selectors = {
  getState
}
