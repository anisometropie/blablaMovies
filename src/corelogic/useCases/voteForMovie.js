import { ofType, StateObservable } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import {
  VOTE_FOR_MOVIE_REQUESTED,
  voteForMovieSucceeded,
  voteForMovieFailed
} from 'store/reducers/movies'

export const voteForMovie = (action$, state$, { moviesGateway }) => {
  return action$.pipe(
    ofType(VOTE_FOR_MOVIE_REQUESTED),
    switchMap(action =>
      moviesGateway.voteForMovie(action.payload).pipe(
        map(movies =>
          voteForMovieSucceeded({
            movies,
            movieId: action.payload.movieId
          })
        ),
        catchError(({ message }) => of(voteForMovieFailed({ error: message })))
      )
    )
  )
}
