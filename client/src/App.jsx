/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {
  Notification,
  SideMenu,
  Editor,
  BoardList,
} from './components'
import {
  BodyWrapper,
} from './components/shared'

export default function App() {
  return (
    <Router>
      <BodyWrapper>
        <Notification />
        <SideMenu>
          {/* <NewBoard /> */}
        </SideMenu>
        <Switch>
          <Route exact path="/">
            <BoardList />
          </Route>
          <Route path="/board/:id">
            <Editor />
          </Route>
        </Switch>
      </BodyWrapper>
    </Router>
  )
}
