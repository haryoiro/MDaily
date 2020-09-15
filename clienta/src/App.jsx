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
  MEditor,
  BoardList,
} from './components'
import {
  BodyWrapper,
} from './components/shared'

import {
  EditorView,
} from './components/templates'

export default function App() {
  return (
    <Router>
      <BodyWrapper>
        <Notification />
        <SideMenu />
        <Switch>
          <Route exact path="/a" component={<EditorView />} />
          <Route exact path="/">
            <BoardList />
          </Route>
          <Route path="/board/:id">
            <MEditor />
          </Route>
        </Switch>
      </BodyWrapper>
    </Router>
  )
}
