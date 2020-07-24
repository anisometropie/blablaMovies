import {
  makeActionsName,
  generateCode,
  parseErrorMessage
} from '../requestActions'

describe('makeActionsName', () => {
  it('should return an object with correct names', () => {
    expect(makeActionsName('CITIES_FETCH')).toEqual({
      requestedAction: 'CITIES_FETCH_REQUESTED',
      succeedAction: 'CITIES_FETCH_SUCCEEDED',
      failedAction: 'CITIES_FETCH_FAILED'
    })
  })
})

describe('generateCode', () => {
  it('should make usable code', () => {
    expect(generateCode('CITIES_FETCH')).toEqual(
      `export const {
      CITIES_FETCH_REQUESTED,
      CITIES_FETCH_SUCCEEDED,
      CITIES_FETCH_FAILED,
      citiesFetchRequested,
      citiesFetchSucceeded,
      citiesFetchFailed,
      citiesFetchRequestStateReducer } = createRequestActions('CITIES_FETCH')`
    )
  })
})

describe('parseErrorMessage', () => {
  it('should extract the error message', () => {
    const error = {
      response: {
        data: {
          errors: [{ code: '404', message: 'Pas de Token!' }]
        }
      }
    }
    const action = {
      type: 'FETCH_CITY_RIDERS_FAILED',
      meta: error
    }
    expect(parseErrorMessage(action)).toEqual('Erreur 404, Pas de Token!')
  })
  it('should return empty string if no error is given', () => {
    const action = {
      type: 'FETCH_CITY_RIDERS_FAILED'
    }
    expect(parseErrorMessage(action)).toEqual('')
  })
})
