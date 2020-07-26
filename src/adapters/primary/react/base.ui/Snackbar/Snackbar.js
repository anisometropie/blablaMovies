import React from 'react'

import { Snackbar as MuiSnackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

function Snackbar({ open, onClose, severity, message }) {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      autoHideDuration={4000}
    >
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
