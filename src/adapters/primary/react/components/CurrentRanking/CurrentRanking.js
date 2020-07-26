import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Dialog, Button } from '@material-ui/core'

import Card from '../../base.ui/Card'

const useStyles = makeStyles({
  root: {},
  moviesList: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: '170px'
  },
  imageContainer: {
    margin: '17px'
  },
  button: { color: 'white', alignSelf: 'center' }
})

function CurrentRanking({ movies }) {
  const sortedMovies = getTop3Movies(movies)
  const classes = useStyles()
  const rankingJSX = sortedMovies.map(m => {
    const { infos } = m
    return (
      <div className={classes.imageContainer}>
        <img className={classes.image} src={infos.Poster} alt={infos.Title} />
        <div>{infos.Title}</div>
        <div>{`${m.votes.length} votes`}</div>
      </div>
    )
  })
  return (
    <Card className={classes.root}>
      <h2>Classement Actuel</h2>
      <div className={classes.moviesList}>{rankingJSX}</div>
      <Button className={classes.button}>Voir tous les films</Button>
    </Card>
  )
}

const getTop3Movies = movies =>
  movies.sort((a, b) => b.votes.length - a.votes.length).slice(0, 3)

export default CurrentRanking
