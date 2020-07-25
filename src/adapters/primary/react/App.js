import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './components/Home'
import MoviesList from './components/MoviesList'

// La société BlablaMovie souhaite donner la parole aux internautes en leur
// permettant de choisir le film qu'ils préfèrent. Chaque utilisateur peut
// choisir jusqu'à 3 films. Au bout d'une semaine, le film gagnant est révélé.

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/login" exact render={() => <div>Login</div>} />
        <Route path="/register" exact render={() => <div>Register</div>} />
        <Route path="/votes" exact render={() => <MoviesList />} />
        <Route path="/" exact render={Home} />
      </Switch>
    </div>
  )
}

export default App
