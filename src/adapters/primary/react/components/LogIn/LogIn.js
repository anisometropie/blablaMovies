import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import UserForm from '../UserForm'

import { loginUserRequested } from 'store/reducers/loggedUser'

function LogIn() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = data => {
    dispatch(loginUserRequested(data))
    history.push('/')
  }

  return (
    <div>
      <UserForm title="Se connecter" onSubmit={handleSubmit} />
    </div>
  )
}

export default LogIn
