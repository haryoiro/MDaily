import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
// import { Notification } from './components/Notification/Notification'
import { BoardList } from './components/Board/BoardList'
import { Board } from './components/Board/Board'
import { NewBoard } from './components/Board/NewBoard'
import { Header } from './components/Header/Header'


export default function App() {
  return (
    <Router>
      <div className="header-wrapper">
        <Header />
        <NewBoard />
      </div>
      <Switch>
        <Route exact path="/board">
          <BoardList />
        </Route>
        <Route path="/board/:id">
          <Board />
        </Route>
      </Switch>
    </Router>
  )
}
