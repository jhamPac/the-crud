import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// comps
import AuthView   from './Auth/AuthView'
import Dashboard  from './Dashboard'
import FoodSupply from './FoodSupply'

export default function Application() {
  const userLoggedIn = useAuth()

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
