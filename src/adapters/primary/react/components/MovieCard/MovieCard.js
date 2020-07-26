import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Dialog, Button } from '@material-ui/core'
import MovieDetails from '../MovieDetails'

const useStyles = makeStyles({
  root: {
    margin: '7px',
    padding: '15px',
    border: '0.5px grey solid',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: 'rgba(30, 20, 30, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  image: {
    cursor: 'pointer'
  },
  button: { color: 'white', alignSelf: 'center' }
})

function MovieCard({ movie, onVote }) {
  const [showDetails, setShowDetails] = useState(false)
  const classes = useStyles()
  const toggleDialog = state => () => setShowDetails(state)

  const { infos } = movie
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <img
          className={classes.image}
          onClick={onVote}
          src={infos?.Poster}
          alt="poster"
        />
        <div>{infos.Title}</div>
        <div>{infos.Year}</div>
        <Button className={classes.button} onClick={toggleDialog(true)}>
          Plus d’infos
        </Button>
      </Paper>
      <Dialog maxWidth="lg" open={showDetails} onClose={toggleDialog(false)}>
        <MovieDetails movie={infos} onVote={onVote} />
      </Dialog>
    </React.Fragment>
  )
}

export default MovieCard
