import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: '350px',
    width: '400px',
    backgroundColor: 'rgba(30, 20, 30, 0.75)',
    color: 'white',
    padding: '50px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
})

function UserForm({ title, onSubmit }) {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <form className={classes.root} autoComplete="off">
        <h2>Créer un compte</h2>
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
        <Button
          className={classes.button}
          onClick={() => {
            onSubmit({ username, password })
          }}
        >
          Valider
        </Button>
      </form>
    </div>
  )
}

export default UserForm
