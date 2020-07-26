import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

import { selectors as moviesSelectors } from 'store/reducers/movies'
import { addMovieRequested } from 'store/reducers/movies'

import UserForm from '../UserForm'
import Card from '../../base.ui/Card'
import Snackbar from '../../base.ui/Snackbar'

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center'
  },
  form: {
    minWidth: '400px',
    padding: '10px 0',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down(470)]: {
      minWidth: '250px'
    }
  },
  textField: {
    width: '250px',
    margin: '5px 0'
  },
  textFieldInput: {
    color: 'white'
  },
  button: {
    color: 'white',
    width: '100px'
  }
}))

function Admin() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [movieTitle, setMovieTitle] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const movies = useSelector(moviesSelectors.getAllMoviesTitles)
  const handleAddMovie = movieTitle => {
    if (
      !movies
        .map(title => title.toLowerCase())
        .includes(movieTitle.toLowerCase())
    ) {
      dispatch(addMovieRequested({ movieTitle }))
      history.push('/votes')
    } else {
      setOpenSnackBar(true)
    }
  }

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          handleAddMovie(movieTitle)
        }}
      >
        <h2>Ajouter un film</h2>
        <TextField
          className={classes.textField}
          InputProps={{
            className: classes.textFieldInput
          }}
          InputLabelProps={{ className: classes.textFieldInput }}
          label="Nom du film"
          variant="outlined"
          value={movieTitle}
          onChange={e => {
            setMovieTitle(e.target.value)
          }}
        />
      </form>
      <Button
        className={classes.button}
        onClick={() => {
          handleAddMovie(movieTitle)
        }}
      >
        Valider
      </Button>
      <Snackbar
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        severity="info"
        message="Ce film est déjà dans la liste"
      />
    </Card>
  )
}

export default Admin
