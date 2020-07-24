import { ActionsObservable, ofType, StateObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'

import {
  FETCH_MOVIES_REQUESTED,
  FETCH_MOVIES_SUCCEEDED
} from 'store/reducers/movies'

export const fetchMovies = (action$, state$, { moviesGateway }) =>
  action$.pipe(
    ofType(FETCH_MOVIES_REQUESTED),
    switchMap(action =>
      moviesGateway.fetchMovies().pipe(
        map(movies => ({
          type: FETCH_MOVIES_SUCCEEDED,
          payload: { movies }
        }))
      )
    )
  )
