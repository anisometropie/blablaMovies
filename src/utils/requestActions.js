import { requestStates } from './requestStates'
import { get, camelCase } from 'lodash'

export const createRequestActions = prefix => {
  const requestedAction = `${prefix}_REQUESTED`
  const succeedAction = `${prefix}_SUCCEEDED`
  const failedAction = `${prefix}_FAILED`
  return {
    [requestedAction]: requestedAction,
    [succeedAction]: succeedAction,
    [failedAction]: failedAction,
    [camelCase(requestedAction)]: data =>
      data
        ? {
            type: requestedAction,
            payload: {
              ...data
            }
          }
        : { type: requestedAction },
    [camelCase(succeedAction)]: data =>
      data
        ? {
            type: succeedAction,
            payload: {
              ...data
            }
          }
        : {
            type: succeedAction
          },
    [camelCase(failedAction)]: err => ({ type: failedAction, meta: err }),
    [`${camelCase(prefix)}RequestStateReducer`]: makeRequestStateReducer(
      requestedAction,
      succeedAction,
      failedAction
    )
  }
}

export const makeRequestStateReducer = (
  requestedAction,
  succeedAction,
  failedAction
) => (state = '', action = {}) => {
  switch (action.type) {
    case succeedAction:
      return requestStates.SUCCESS
    case failedAction:
      return requestStates.FAILED
    case requestedAction:
      return requestStates.PENDING
    default:
      return state
  }
}

export const parseErrorMessage = (action = {}) => {
  const { code, message } = get(action, 'meta.response.data.errors.0', {})
  return code || message ? `Erreur ${code}, ${message}` : ''
}

export const makeActionsName = prefix => ({
  requestedAction: `${prefix}_REQUESTED`,
  succeedAction: `${prefix}_SUCCEEDED`,
  failedAction: `${prefix}_FAILED`
})

export const generateCode = prefix => {
  const { requestedAction, succeedAction, failedAction } = makeActionsName(
    prefix
  )
  return `export const {
      ${requestedAction},
      ${succeedAction},
      ${failedAction},
      ${camelCase(requestedAction)},
      ${camelCase(succeedAction)},
      ${camelCase(failedAction)},
      ${camelCase(
        prefix
      )}RequestStateReducer } = createRequestActions('${prefix}')`
}
