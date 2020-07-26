import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import UserForm from '../UserForm'

import { registerUserRequested } from 'store/reducers/loggedUser'

function Register() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = data => {
    dispatch(registerUserRequested(data))
    history.push('/')
  }

  return (
    <div>
      <UserForm title="Créer un compte" onSubmit={handleSubmit} />
    </div>
  )
}

export default Register
