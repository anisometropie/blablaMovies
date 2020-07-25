import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectors as moviesSelectors,
  fetchMoviesRequested
} from 'store/reducers/movies'

export default function MoviesList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMoviesRequested())
  }, [])
  const movies = useSelector(moviesSelectors.getAllMoviesTitles)
  const moviesElements = movies.map(m => <div>{m}</div>)
  return <div>{moviesElements}</div>
}
