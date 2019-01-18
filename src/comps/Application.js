import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
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
    });
  }

  componentWillUnmount() {
    this.fireBaseListener = undefined
  }

  userAuthRouteGuard() {
    const { userLoggedIn } = this.state
  }

  render() {
    return(
      <div id="UI">
        <Router>
          <Switch>
            <Route path="/food-supply" component={ FoodSupply }></Route>
            <Route path="/dashboard"   component={ Dashboard }></Route>
            <Route exact path="/"      component={ AuthPage }></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
