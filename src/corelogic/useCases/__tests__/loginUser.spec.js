import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import {
  loginUserRequested,
  loginUserSucceeded,
  defaultState
} from 'store/reducers/loggedUser'
import { requestStates } from 'utils/requestStates'

describe('loginUser', () => {
  let store
  let moviesGateway
  let initialState

  describe('when user login to website', () => {
    it('should set the user as logged user if user exists', () => {
      const user = { username: 'Michou', password: 'γ' }
      const users = [{ ...user, id: 666 }]
      initializeTest(users)
      loginUser(user)
      expectUserState({
        infos: { username: 'Michou', password: 'γ', id: 666 },
        requestState: requestStates.SUCCESS,
        errorMessage: ''
      })
    })
    it('should reset loggedUser as defaultState if user do not exist', () => {
      const users = [{ username: 'Michou', password: 'γ', id: 666 }]
      initializeTest(users)
      loginUser({ username: 'Michou', password: 'γ' })

      loginUser({ username: 'Alfred', password: 'γ' })
      expectUserState({
        ...defaultState,
        requestState: requestStates.FAILED,
        errorMessage: 'User not found'
      })
    })
  })

  const initializeTest = (users = []) => {
    moviesGateway = new InMemoryBlablaMovieGateway()
    moviesGateway.users = users
    store = createReduxStore({ moviesGateway })
    initialState = store.getState()
  }

  const loginUser = data => {
    store.dispatch(loginUserRequested(data))
  }

  const expectUserState = expectedUserState => {
    expect(store.getState()).toEqual({
      ...initialState,
      loggedUser: expectedUserState
    })
  }
})
