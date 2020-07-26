import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { requestStates } from 'utils/requestStates'
import UserForm from '../UserForm'
import Snackbar from '../../base.ui/Snackbar'

import {
  loginUserRequested,
  selectors as loggedUserSelectors
} from 'store/reducers/loggedUser'

function LogIn() {
  const dispatch = useDispatch()
  const history = useHistory()
  const requestState = useSelector(loggedUserSelectors.getRequestState)
  const errorMessage = useSelector(loggedUserSelectors.getErrorMessage)

  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [waitingForRequest, setWaitingForRequest] = useState(false)
  useEffect(() => {
    if (requestState === requestStates.FAILED) {
      setWaitingForRequest(false)
      setOpenSnackBar(true)
    } else if (
      requestState === requestStates.SUCCESS &&
      waitingForRequest === true
    ) {
      history.push('/')
    }
  }, [requestState, waitingForRequest])

  const handleSubmit = data => {
    setWaitingForRequest(true)
    dispatch(loginUserRequested(data))
  }

  return (
    <div>
      <UserForm title="Se connecter" onSubmit={handleSubmit} />
      <Snackbar
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        severity="info"
        message={errorMessage}
      />
    </div>
  )
}

export default LogIn
