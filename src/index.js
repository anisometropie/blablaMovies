import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { createReduxStore } from 'store/reduxStore'
import { InMemoryBlablaMovieGateway } from 'adapters/secondary/InMemoryBlablaMovieGateway'
import App from 'adapters/primary/react/App'

const moviesGateway = new InMemoryBlablaMovieGateway()
const store = createReduxStore({
  moviesGateway
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
