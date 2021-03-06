import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import {
  fetchMoviesRequested,
  voteForMovieRequested,
  defaultState
} from 'store/reducers/movies'

import {
  loginUserSucceeded,
  selectors as loggedUserSelectors
} from 'store/reducers/loggedUser'

describe('voteForMovie', () => {
  let store
  let moviesGateway
  let initialState

  describe('when user vote for a movie', () => {
    it('should update movie score', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      const user = { name: 'Michou', id: 489, votes: [] }
      initializeTest(movies, [user])
      voteForMovie({ movieId: 0, user })
      expectMoviesState([
        {
          id: 0,
          title: 'Once Upon a Time in Hollywood',
          infos: { Title: 'Once Upon a Time in Hollywood' },
          votes: [{ userId: 489 }]
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
      const user = { name: 'Michou', id: 489, votes: [] }
      initializeTest(movies, [user])
      voteForMovie({ movieId: 2, user })
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
          votes: [{ userId: 489 }]
        },
        { id: 3, title: 'X files', infos: { Title: 'X files' }, votes: [] }
      ])
    })
    it('should update user number of votes', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      const user = { name: 'Michou', id: 489, votes: [] }
      initializeTest(movies, [user])
      loginUser({ user })
      voteForMovie({ movieId: 0, user })
      expectUserState({ name: 'Michou', id: 489, votes: [{ movieId: 0 }] })
    })
    it('should NOT update user number of votes if user already voted', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      const user = { name: 'Michou', id: 489, votes: [] }
      initializeTest(movies, [user])
      loginUser({ user })
      voteForMovie({ movieId: 0, user })
      voteForMovie({ movieId: 0, user })
      expectUserState({ name: 'Michou', id: 489, votes: [{ movieId: 0 }] })
    })
  })

  const initializeTest = (movies, users) => {
    moviesGateway = new InMemoryBlablaMovieGateway(movies)
    store = createReduxStore({ moviesGateway })
    moviesGateway.users = users

    fetchMovies()
    initialState = store.getState()
  }

  const loginUser = user => {
    store.dispatch(loginUserSucceeded(user))
  }

  const fetchMovies = () => {
    store.dispatch(fetchMoviesRequested())
  }

  const voteForMovie = data => {
    store.dispatch(voteForMovieRequested(data))
  }

  const expectMoviesState = moviesState => {
    expect(store.getState().movies).toEqual(moviesState)
  }

  const expectUserState = loggedUserState => {
    const state = store.getState()
    expect(loggedUserSelectors.getUserInfos(state)).toEqual(loggedUserState)
  }
})
