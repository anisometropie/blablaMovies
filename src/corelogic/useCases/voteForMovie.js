import { ofType, StateObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'

import {
  VOTE_FOR_MOVIE_REQUESTED,
  voteForMovieSucceeded
} from 'store/reducers/movies'

export const voteForMovie = (action$, state$, { moviesGateway }) => {
  return action$.pipe(
    ofType(VOTE_FOR_MOVIE_REQUESTED),
    switchMap(action =>
      moviesGateway
        .voteForMovie(action.payload)
        .pipe(map(movies => voteForMovieSucceeded({ movies })))
    )
  )
}
