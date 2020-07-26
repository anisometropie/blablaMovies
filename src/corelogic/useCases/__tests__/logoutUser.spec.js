import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import {
  logoutUser,
  loginUserSucceeded,
  defaultState
} from 'store/reducers/loggedUser'

describe('Logout user', () => {
  let store
  let moviesGateway
  let initialState

  describe('when user log out of the website', () => {
    it('should set the loggedUser empty', () => {
      const user = { username: 'Michou', password: 'ξ' }
      initializeTest()
      store.dispatch(loginUserSucceeded({ user }))
      store.dispatch(logoutUser())
      expectUserState(defaultState)
    })
  })

  const initializeTest = (users = []) => {
    store = createReduxStore()
    initialState = store.getState()
  }

  const expectUserState = expectedUserState => {
    expect(store.getState()).toEqual({
      ...initialState,
      loggedUser: expectedUserState
    })
  }
})
