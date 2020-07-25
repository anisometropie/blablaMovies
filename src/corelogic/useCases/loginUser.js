import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import {
  LOGIN_USER_REQUESTED,
  loginUserSucceeded,
  loginUserFailed
} from 'store/reducers/loggedUser'

export const loginUser = (action$, state$, { moviesGateway }) => {
  return action$.pipe(
    ofType(LOGIN_USER_REQUESTED),
    switchMap(action =>
      moviesGateway.loginUser(action.payload).pipe(
        map(user => loginUserSucceeded({ user })),
        catchError(({ message }) => of(loginUserFailed({ error: message })))
      )
    )
  )
}
