import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {
  Notification,
  NewBoard,
  SideMenu,
  Board,
  BoardList,
} from './components'

export default function App() {

  return (
    <Router>
      <Notification />
      <SideMenu>
        <NewBoard />
      </SideMenu>
      <Switch>
        <Route exact path="/">
          <BoardList />
        </Route>
        <Route path="/board/:id">
          <Board />
        </Route>
      </Switch>
    </Router>
  )
}
