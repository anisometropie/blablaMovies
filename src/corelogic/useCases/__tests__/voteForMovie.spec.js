import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import {
  fetchMoviesRequested,
  voteForMovieRequested,
  defaultState
} from 'store/reducers/movies'

describe('voteForMovie', () => {
  let store
  let moviesGateway
  let initialState

  describe('when user vote for a movie', () => {
    it('should update movie score', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      const user = { name: 'Michou', id: 489 }
      initializeTest(movies)
      voteForMovie({ movieId: 0, rating: 5, user })
      expectMoviesState([
        {
          id: 0,
          title: 'Once Upon a Time in Hollywood',
          infos: { Title: 'Once Upon a Time in Hollywood' },
          votes: [{ userId: 489, rating: 5 }]
        }
      ])
    })
    it('should update movie score', () => {
      const movies = [
        { Title: 'Once Upon a Time in Hollywood' },
        { Title: 'Heat' },
        { Title: 'Reservoir Dog' },
        { Title: 'X files' }
      ]
      const user = { name: 'Michou', id: 489 }
      initializeTest(movies)
      voteForMovie({ movieId: 2, rating: 1, user })
      expectMoviesState([
        {
          id: 0,
          title: 'Once Upon a Time in Hollywood',
          infos: { Title: 'Once Upon a Time in Hollywood' },
          votes: []
        },
        { id: 1, title: 'Heat', infos: { Title: 'Heat' }, votes: [] },
        {
          id: 2,
          title: 'Reservoir Dog',
          infos: { Title: 'Reservoir Dog' },
          votes: [{ userId: 489, rating: 1 }]
        },
        { id: 3, title: 'X files', infos: { Title: 'X files' }, votes: [] }
      ])
    })
  })

  const initializeTest = movies => {
    moviesGateway = new InMemoryBlablaMovieGateway(movies)
    store = createReduxStore({ moviesGateway })
    fetchMovies()
    initialState = store.getState()
  }

  const fetchMovies = () => {
    store.dispatch(fetchMoviesRequested())
  }

  const voteForMovie = data => {
    store.dispatch(voteForMovieRequested(data))
  }

  const expectMoviesState = moviesState => {
    expect(store.getState()).toEqual({
      ...initialState,
      movies: moviesState
    })
  }
})
