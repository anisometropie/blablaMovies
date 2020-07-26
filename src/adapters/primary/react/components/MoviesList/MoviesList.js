import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

import {
  selectors as moviesSelectors,
  fetchMoviesRequested,
  voteForMovieRequested
} from 'store/reducers/movies'
import { selectors as loggedUserSelectors } from 'store/reducers/loggedUser'

import Snackbar from '../../base.ui/Snackbar'
import MovieCard from '../MovieCard'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}

class MoviesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selection: [], openSnackBar: false }
  }
  componentDidMount() {
    const { fetchMovies } = this.props
    fetchMovies()
  }

  handleMovieVote = movieId => () => {
    const { user, voteForMovie } = this.props
    if (isEmpty(user)) {
      this.openSnackBar('Vous devez être connecté pour voter.')
    } else if (user.votes.find(m => m.movieId === movieId) !== undefined) {
      this.openSnackBar('Vous avez déjà voté pour ce film.')
    } else if (user.votes.length >= 3) {
      this.openSnackBar('Vous avez déjà voté pour 3 films.')
    } else {
      voteForMovie(movieId, user)
    }
  }

  openSnackBar = message => {
    this.setState({
      openSnackBar: true,
      snackbarMessage: message
    })
  }

  handleCloseSnackbar = () => {
    this.setState({ openSnackBar: false })
  }

  render() {
    const { classes, movies } = this.props
    const { openSnackBar, snackbarMessage } = this.state
    const moviesElements = movies.map(m => (
      <MovieCard movie={m} onVote={this.handleMovieVote(m.id)} />
    ))
    return (
      <React.Fragment>
        <div className={classes.root}>{moviesElements}</div>
        <Snackbar
          open={openSnackBar}
          onClose={this.handleCloseSnackbar}
          severity="info"
          message={snackbarMessage}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  movies: moviesSelectors.getState(state),
  user: loggedUserSelectors.getState(state)
})

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => {
    dispatch(fetchMoviesRequested())
  },
  voteForMovie: (movieId, user) => {
    dispatch(voteForMovieRequested({ movieId, user }))
  }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(MoviesList)
