import { ofType, StateObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'

import {
  REGISTER_USER_REQUESTED,
  registerUserSucceeded
} from 'store/reducers/loggedUser'

export const registerUser = (action$, state$, { moviesGateway }) => {
  return action$.pipe(
    ofType(REGISTER_USER_REQUESTED),
    switchMap(action =>
      moviesGateway
        .registerUser(action.payload)
        .pipe(map(user => registerUserSucceeded({ user })))
    )
  )
}
