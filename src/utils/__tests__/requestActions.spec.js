import {
  createRequestActions,
  makeActionsName,
  generateCode,
  parseErrorMessage
} from '../requestActions'

describe('createRequestActions', () => {
  describe('requestedAction function', () => {
    it('should create an action with type and payload', () => {
      const { fetchRequested } = createRequestActions('FETCH')
      expect(fetchRequested({ famille: 'Polygonaceae' })).toEqual({
        type: 'FETCH_REQUESTED',
        payload: {
          famille: 'Polygonaceae'
        }
      })
    })
    it('should create an action with type only', () => {
      const { fetchRequested } = createRequestActions('FETCH')
      expect(fetchRequested()).toEqual({
        type: 'FETCH_REQUESTED'
      })
    })
  })
  describe('succeedAction function', () => {
    it('should create an action with type and payload', () => {
      const { fetchSucceeded } = createRequestActions('FETCH')
      expect(fetchSucceeded({ famille: 'Polygonaceae' })).toEqual({
        type: 'FETCH_SUCCEEDED',
        payload: {
          famille: 'Polygonaceae'
        }
      })
    })
    it('should create an action with type only', () => {
      const { fetchSucceeded } = createRequestActions('FETCH')
      expect(fetchSucceeded()).toEqual({
        type: 'FETCH_SUCCEEDED'
      })
    })
  })
})

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
