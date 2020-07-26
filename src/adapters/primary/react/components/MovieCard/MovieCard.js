import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, Button } from '@material-ui/core'

import { selectors as loggedUserSelectors } from 'store/reducers/loggedUser'
import MovieDetails from '../MovieDetails'
import Card from '../../base.ui/Card'
import { includes } from 'lodash'

const useStyles = makeStyles({
  image: {
    cursor: 'pointer'
  },
  button: { color: 'white', alignSelf: 'center' },
  selectedMovie: { boxSizing: 'border-box', border: 'solid 2px yellow' }
})

function MovieCard({ movie, onVote }) {
  const user = useSelector(loggedUserSelectors.getState)
  const [showDetails, setShowDetails] = useState(false)
  const classes = useStyles()
  const toggleDialog = state => () => setShowDetails(state)

  const { infos } = movie
  return (
    <React.Fragment>
      <Card
        className={
          user?.votes?.find(m => m.movieId === movie.id) !== undefined
            ? classes.selectedMovie
            : ''
        }
      >
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
