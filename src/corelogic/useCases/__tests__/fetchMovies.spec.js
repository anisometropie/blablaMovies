import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import { fetchMoviesRequested, defaultState } from 'store/reducers/movies'

describe('fetch movies', () => {
  let store
  let moviesGateway
  let initialState

  describe('when api returns no movies', () => {
    it('should set movies as empty array', () => {
      initializeTest()
      fetchMovies()
      expectMoviesState([])
    })
  })

  describe('when api returns some movies', () => {
    it('should put the list in the store', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      initializeTest(movies)
      fetchMovies()
      expectMoviesState([
        {
          title: 'Once Upon a Time in Hollywood',
          infos: { Title: 'Once Upon a Time in Hollywood' },
          votes: []
        }
      ])
    })
    it('should put the list in the store', () => {
      const movies = [{ Title: 'Abc' }, { Title: 'Efg' }]
      initializeTest(movies)
      fetchMovies()
      expectMoviesState([
        {
          title: 'Abc',
          infos: { Title: 'Abc' },
          votes: []
        },
        {
          title: 'Efg',
          infos: { Title: 'Efg' },
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
