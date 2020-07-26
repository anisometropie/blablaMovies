import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import Card from '../../base.ui/Card'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down(500)]: {
      width: '80%',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  moviesList: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down(500)]: {
      flexDirection: 'column'
    }
  },
  image: {
    width: '170px',
    [theme.breakpoints.between(500, 700)]: {
      width: '100px'
    }
  },
  imageContainer: {
    margin: '17px'
  },
  button: { color: 'white', alignSelf: 'center', textDecoration: 'none' }
}))

function CurrentRanking({ movies }) {
  const sortedMovies = getTop3Movies(movies)
  const classes = useStyles()
  const rankingJSX = sortedMovies.map(m => {
    const { infos } = m
    return (
      <div className={classes.imageContainer}>
        <img className={classes.image} src={infos.Poster} alt={infos.Title} />
        <div>{infos.Title}</div>
        <div>{`${m.votes.length} ${
          m.votes.length > 1 ? 'votes' : 'vote'
        }`}</div>
      </div>
    )
  })
  return (
    <Card className={classes.root}>
      <h2>Classement Actuel</h2>
      <div className={classes.moviesList}>{rankingJSX}</div>
      <Link className={classes.button} to="/votes">
        <Button className={classes.button}>Voir tous les films</Button>
      </Link>
    </Card>
  )
}

const getTop3Movies = movies =>
  movies.sort((a, b) => b.votes.length - a.votes.length).slice(0, 3)

export default CurrentRanking
