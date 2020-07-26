import React from 'react'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import {
  selectors as moviesSelectors,
  fetchMoviesRequested,
  voteForMovieRequested
} from 'store/reducers/movies'
import { selectors as loggedUserSelectors } from 'store/reducers/loggedUser'

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
    this.state = { selection: [] }
  }
  // ne fonctionne pas à l’intérieur d’un switch react-router?
  componentDidMount() {
    const { fetchMovies } = this.props
    fetchMovies()
  }

  handleMovieVote = movieId => () => {
    const { user, voteForMovie } = this.props
    voteForMovie(movieId, user)
  }

  render() {
    const { classes, movies } = this.props
    const moviesElements = movies.map(m => (
      <MovieCard movie={m} onVote={this.handleMovieVote(m.id)} />
    ))
    return <div className={classes.root}>{moviesElements}</div>
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
