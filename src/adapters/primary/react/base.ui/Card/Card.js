import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import classnames from 'classnames'

const useStyles = makeStyles({
  root: {
    margin: '7px',
    padding: '15px',
    border: '0.5px grey solid',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: 'rgba(30, 20, 30, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
})

function Card({ children, className }) {
  const classes = useStyles()
  return (
    <Paper className={classnames(classes.root, className)}>{children}</Paper>
  )
}

export default Card
