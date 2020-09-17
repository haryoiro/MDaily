/**
 * Atomic DesignにおけるPageの役割
 * ルーティングのみ担うこと
 */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { 
  LandingPage,
} from './components/templates'


//https://github.com/j0lv3r4/jolvera.dev
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={<LandingPage />}/>
      </Switch>
    </Router>
  )
}

export default App;
