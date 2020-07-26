import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

import Card from '../../base.ui/Card'

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

function UserForm({ title, onSubmit }) {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Card className={classes.root}>
      <form className={classes.form} autoComplete="off">
        <h2>{title}</h2>
        <TextField
          className={classes.textField}
          InputProps={{
            className: classes.textFieldInput
          }}
          InputLabelProps={{ className: classes.textFieldInput }}
          label="Nom d’utilisateur"
          variant="outlined"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
          }}
        />
        <TextField
          className={classes.textField}
          InputProps={{
            className: classes.textFieldInput
          }}
          InputLabelProps={{ className: classes.textFieldInput }}
          label="Mot de passe"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
      </form>
      <Button
        className={classes.button}
        onClick={() => {
          onSubmit({ username, password })
        }}
      >
        Valider
      </Button>
    </Card>
  )
}

export default UserForm
