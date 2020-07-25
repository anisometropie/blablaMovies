import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectors as moviesSelectors,
  fetchMoviesRequested
} from 'store/reducers/movies'

export default function Home() {
  return (
    <div>
      <h1>BlablaMovie</h1>
      <div>Votez pour votre film préféré</div>
      <div>cette semaine</div>
      <div>Film le mieux noté</div>
    </div>
  )
}
