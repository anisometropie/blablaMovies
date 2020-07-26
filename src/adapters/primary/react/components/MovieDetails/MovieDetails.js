import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import classnames from 'classnames'

const useStyles = makeStyles({
  root: {
    margin: '7px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'row'
  },
  sides: {
    padding: 'auto',
    width: '500px'
  },
  left: {
    padding: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    right: '50px',
    bottom: '30px'
  }
})

function MovieDetails({ movie, onVote }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classnames(classes.sides, classes.left)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
      </div>
      <div className={classes.sides}>
        <h3>{movie.Title}</h3>
        <p>Réalisation : {movie.Director}</p>
        <p>Sortie : {movie.Year}</p>
        <p>Durée : {movie.Runtime}</p>
        <p>Genre : {movie.Genre}</p>
        <p>Acteurs : {movie.Actors}</p>
        <p>Synopsis : {movie.Plot}</p>
        <Button className={classes.button} onClick={onVote}>
          Voter pour ce film
        </Button>
      </div>
    </div>
  )
}

export default MovieDetails
