import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { useQuery } from 'react-query'
import { getAll } from './services/access'
import { Notification } from './components/Notification/Notification'
import { BoardList } from './components/Board/BoardList'
import { Board } from './components/Board/Board'
import { NewBoard } from './components/Board/NewBoard'
import { Header } from './components/Header/Header'


export default function App() {
  const { isLoading, isError, data, error, refetch } = useQuery('board', getAll)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <Router>
      <div className="header-wrapper">
        <Header />
        <NewBoard />
        <Notification />
      </div>
      <Switch>
        <Route exact path="/">
          <BoardList data={data} />
        </Route>
        <Route path="/board/:id">
          <Board datas={data} refetch={refetch} />
        </Route>
      </Switch>
    </Router>
  )
}
