import React, { Component } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { firebaseRef } from '../firebase'

// comps
import AuthPage   from './AuthPage'
import Dashboard  from './Dashboard'
import FoodSupply from './FoodSupply'

export default class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoggedIn: false
    }

    this.fireBaseListener = firebaseRef.auth().onAuthStateChanged(user => {
      (user) ? this.setState({ userLoggedIn: true }) : this.setState({ userLoggedIn: false })
    })
  }

  componentWillUnmount() {
    this.fireBaseListener = undefined
  }

  userAuthRouteGuard(routerProps, Component) {
    const { userLoggedIn } = this.state

    return (userLoggedIn)
      ? <Component { ...routerProps }/>
      : <Redirect to="/" />
  }

  render() {
    return(
      <div id="UI">
        <Router>
          <Switch>
            <Route path="/food-supply" render={ (routerProps) => this.userAuthRouteGuard(routerProps, FoodSupply) } />
            <Route path="/dashboard"   render={ (routerProps) => this.userAuthRouteGuard(routerProps, Dashboard) } />
            <Route exact path="/"      component={ AuthPage } />
          </Switch>
        </Router>
      </div>
    )
  }
}
