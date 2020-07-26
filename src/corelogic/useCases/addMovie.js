import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import {
  ADD_MOVIE_REQUESTED,
  addMovieSucceeded,
  addMovieFailed
} from 'store/reducers/movies'

export const addMovie = (action$, state$, { moviesGateway }) => {
  return action$.pipe(
    ofType(ADD_MOVIE_REQUESTED),
    switchMap(action =>
      moviesGateway.addMovie(action.payload).pipe(
        map(movies => addMovieSucceeded({ movies })),
        catchError(({ message }) => of(addMovieFailed({ error: message })))
      )
    )
  )
}
