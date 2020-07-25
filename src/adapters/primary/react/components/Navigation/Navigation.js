import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

import { selectors as loggedUserSelectors } from 'store/reducers/loggedUser'

export const useStyles = makeStyles({
  navigationBar: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '15px 60px',
    backgroundColor: '#F2FFF9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  item: {
    listStyle: 'none',
    margin: '0 16px'
  },
  link: {
    color: 'black',
    textDecoration: 'none !important',
    '&:hover': {
      fontWeight: '500'
    },
    cursor: 'pointer'
  }
})

function DashboardNavigation() {
  const loggedUser = useSelector(loggedUserSelectors.getState)
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleLogout = () => {
    // dispatch()
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
