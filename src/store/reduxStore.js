import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'
import rootEpic from './rootEpic'

export const createReduxStore = dependencies => {
  const epicMiddleware = createEpicMiddleware({ dependencies })

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )

  epicMiddleware.run(rootEpic)
  return store
}
