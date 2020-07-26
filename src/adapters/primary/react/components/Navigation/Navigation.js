import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

import {
  selectors as loggedUserSelectors,
  logoutUser
} from 'store/reducers/loggedUser'

const useStyles = makeStyles(theme => ({
  navigationBar: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '15px 60px',
    backgroundColor: '#F2FFF9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    [theme.breakpoints.down(600)]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.down(470)]: {
      flexDirection: 'column'
    }
  },
  item: {
    listStyle: 'none',
    margin: '0 16px',
    [theme.breakpoints.between(470, 600)]: {
      margin: '0 6px'
    },
    [theme.breakpoints.between(500, 600)]: {
      margin: '0 10px'
    }
  },
  link: {
    color: 'black',
    textDecoration: 'none !important',
    '&:hover': {
      fontWeight: '500'
    },
    cursor: 'pointer'
  }
}))

function DashboardNavigation() {
  const loggedUser = useSelector(loggedUserSelectors.getState)
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <ul className={classes.navigationBar}>
      <li className={classes.item}>
        <Link className={classes.link} to="/">
          Home
        </Link>
      </li>
      <li className={classes.item}>
        <Link className={classes.link} to="/votes">
          Votes
        </Link>
      </li>
      {isEmpty(loggedUser) ? (
        <React.Fragment>
          <li className={classes.item}>
            <Link className={classes.link} to="/register">
              Créer un compte
            </Link>
          </li>
          <li className={classes.item}>
            <Link className={classes.link} to="/login">
              Se connecter
            </Link>
          </li>
        </React.Fragment>
      ) : (
        <li className={classes.item}>
          <div className={classes.link} onClick={handleLogout}>
            Se déconnecter
          </div>
        </li>
      )}
    </ul>
  )
}

export default DashboardNavigation
