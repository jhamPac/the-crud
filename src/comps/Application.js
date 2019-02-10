import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { firebaseRef } from '../firebase'

// comps
import AuthView   from './Auth/AuthView'
import Dashboard  from './Dashboard'
import FoodSupply from './FoodSupply'

export default function Application() {
  const [ userLoggedIn, setLoginState ] = useState(false)

  useEffect(() => {
    firebaseRef.auth().onAuthStateChanged(user => {
      (user) ? setLoginState(true) : setLoginState(false)
    })
  })

  function userAuthRouteGuard(routerProps, Component) {
    return (userLoggedIn)
      ? <Component { ...routerProps }/>
      : <Redirect to="/" />
  }

  return(
    <div id="UI">
      <Router>
        <Switch>
          <Route path="/food-supply" render={ (routerProps) => userAuthRouteGuard(routerProps, FoodSupply) } />
          <Route path="/dashboard"   render={ (routerProps) => userAuthRouteGuard(routerProps, Dashboard) } />
          <Route exact path="/"      component={ AuthView } />
        </Switch>
      </Router>
    </div>
  )
}
