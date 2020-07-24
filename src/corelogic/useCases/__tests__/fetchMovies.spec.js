import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import { fetchMoviesRequested, defaultState } from 'store/reducers/movies'

describe('fetch movies', () => {
  let store
  let moviesGateway
  let initialState

  beforeEach(() => {
    moviesGateway = new InMemoryBlablaMovieGateway()
    store = createReduxStore({ moviesGateway })
    initialState = store.getState()
  })

  describe('when api returns no movies', () => {
    it('should set movies as empty array', () => {
      fetchMovies()
      expectMoviesState([])
    })
  })

  describe('when api returns some movies', () => {
    it('should put the list in the store', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      moviesGateway.movies = movies
      fetchMovies()
      expectMoviesState(movies)
    })
  })

  const fetchMovies = () => {
    store.dispatch(fetchMoviesRequested())
  }

  const expectMoviesState = moviesState => {
    expect(store.getState()).toEqual({
      ...initialState,
      movies: moviesState
    })
  }
})
