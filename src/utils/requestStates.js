export const requestStates = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
}

export const requestIsPending = val => val === requestStates.PENDING
export const requestIsLoadedWithSuccess = val => val === requestStates.SUCCESS
