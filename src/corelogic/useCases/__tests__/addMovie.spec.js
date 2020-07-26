import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import { addMovieRequested, defaultState } from 'store/reducers/movies'

import { loginUserSucceeded } from 'store/reducers/loggedUser'

const testMovie = {
  json: () => ({
    Title: 'GoldenEye',
    Year: '1995'
  })
}
jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(testMovie))

const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

describe('addMovie', () => {
  let store
  let moviesGateway
  let initialState

  describe('when admin add a new movie', () => {
    it('should add movie to the list with infos from OMDB', async () => {
      const movieTitle = 'Goldeneye'
      initializeTest()
      addMovie({ movieTitle })
      await waitForAsync()
      expectMoviesState([
        {
          id: 0,
          title: 'GoldenEye',
          infos: {
            Title: 'GoldenEye',
            Year: '1995'
          },
          votes: []
        }
      ])
    })
  })

  const initializeTest = (movies = []) => {
    moviesGateway = new InMemoryBlablaMovieGateway(movies)
    store = createReduxStore({ moviesGateway })
    initialState = store.getState()
  }

  const addMovie = data => {
    store.dispatch(addMovieRequested(data))
  }

  const expectMoviesState = moviesState => {
    expect(store.getState().movies).toEqual(moviesState)
  }

  const expectUserState = loggedUserState => {
    expect(store.getState().loggedUser).toEqual(loggedUserState)
  }
})
