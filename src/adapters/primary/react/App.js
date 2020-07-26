import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Navigation from './components/Navigation'
import Home from './components/Home'
import MoviesList from './components/MoviesList'
import Register from './components/Register'
import LogIn from './components/LogIn'

// La société BlablaMovie souhaite donner la parole aux internautes en leur
// permettant de choisir le film qu'ils préfèrent. Chaque utilisateur peut
// choisir jusqu'à 3 films. Au bout d'une semaine, le film gagnant est révélé.

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <Navigation />
      <Switch>
        <Route path="/login" exact render={() => <LogIn />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/votes" exact render={() => <MoviesList />} />
        <Route path="/" exact render={Home} />
      </Switch>
    </div>
  )
}

export default App
