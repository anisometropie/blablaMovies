import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, Button } from '@material-ui/core'

import MovieDetails from '../MovieDetails'
import Card from '../../base.ui/Card'

const useStyles = makeStyles({
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
      <Card>
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
      </Card>
      <Dialog maxWidth="lg" open={showDetails} onClose={toggleDialog(false)}>
        <MovieDetails movie={infos} onVote={onVote} />
      </Dialog>
    </React.Fragment>
  )
}

export default MovieCard
