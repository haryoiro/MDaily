import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css'
// import { Notification } from './components/Notification/Notification'
import { BoardList } from './components/Board/BoardList'
import { Board } from './components/Board/Board'


export default function App() {
  return (
    <Router>
      <div className="header-wrapper">
        <Header />
      </div>
      <Switch>
        <Route exact path="/boards">
          <BoardList />
        </Route>
        {/* <Route path="/board/new">
          <NewBoard />
        </Route> */}
        <Route path="/board/:id">
          <Board />
        </Route>
      </Switch>
    </Router>
  )
}


function Header() {
  return (
    <div>
      Header
  </div>
  )
}