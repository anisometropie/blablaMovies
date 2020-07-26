import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

import {
  selectors as moviesSelectors,
  fetchMoviesRequested
} from 'store/reducers/movies'

import Card from '../../base.ui/Card'
import CurrentRanking from '../CurrentRanking'
import logo from 'assets/logo.png'

const useStyles = makeStyles(theme => ({
  top: {
    [theme.breakpoints.down(700)]: {
      width: '80%'
    }
  },
  logo: { alignSelf: 'center' }
}))

function Home() {
  const movies = useSelector(moviesSelectors.getState)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isEmpty(movies)) {
      dispatch(fetchMoviesRequested())
    }
  }, [movies])

  const classes = useStyles()
  return (
    <React.Fragment>
      <Card className={classes.top}>
        <img className={classes.logo} src={logo} alt="" />
        <div>Chaque semaine, votez pour vos films préférés</div>
        <p>
          Vous pouvez sélectionner trois films. Au bout d’une semaine, les
          résultats sont annoncés.
        </p>
        <p>Cette semaine, choisissez parmi les films de Quentin Tarantino</p>
      </Card>
      <CurrentRanking movies={movies} />
    </React.Fragment>
  )
}

export default Home
