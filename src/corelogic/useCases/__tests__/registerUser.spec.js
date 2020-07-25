import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import { registerUserRequested, defaultState } from 'store/reducers/loggedUser'

describe('registerUser', () => {
  let store
  let moviesGateway
  let initialState

  describe('when user registers to website', () => {
    it('should set the user as logged user', () => {
      const user = { username: 'Michou', password: 'γ' }
      initializeTest()
      registerUser(user)
      expectUserState({ username: 'Michou', password: 'γ', id: 0 })
    })
  })

  const initializeTest = movies => {
    moviesGateway = new InMemoryBlablaMovieGateway()
    store = createReduxStore({ moviesGateway })
    initialState = store.getState()
  }

  const registerUser = data => {
    store.dispatch(registerUserRequested(data))
  }

  const expectUserState = expectedUserState => {
    expect(store.getState()).toEqual({
      ...initialState,
      loggedUser: expectedUserState
    })
  }
})
