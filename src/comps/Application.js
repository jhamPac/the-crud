import React    from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// comps
import AuthPage   from './comps/AuthPage'
import Dashboard  from './comps/Dashboard'
import FoodSupply from './comps/FoodSupply'

export default function Application() {
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
