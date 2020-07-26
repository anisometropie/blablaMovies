import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'

import {
  FETCH_MOVIES_REQUESTED,
  fetchMoviesSucceeded
} from 'store/reducers/movies'

export const fetchMovies = (action$, state$, { moviesGateway }) =>
  action$.pipe(
    ofType(FETCH_MOVIES_REQUESTED),
    switchMap(action =>
      moviesGateway
        .fetchMovies()
        .pipe(map(movies => fetchMoviesSucceeded({ movies })))
    )
  )
