import React from 'react';
import styled from 'styled-components'
import { FlexGrid, Link } from '../shared'
import { useQuery } from 'react-query'
import { getAll } from '../../services/access'

function BoardList() {
  const { isLoading, isError, data, error } = useQuery('board', getAll)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  function parseTextFromSlate(a) {
    return JSON.parse(a.contents.text)
      .map(b => b.children[0].text)
      .join('\n')
  }

  return (
    <BoardRow>
      {data.map(a =>
        <BoardLink to={`/board/${a.id}`} key={a.id}>
          <Item key={a.id}>
            <BoardTitle>{a.title ? a.title : 'untitled'}</BoardTitle>
            <BoardBody>{parseTextFromSlate(a)} </BoardBody>
          </Item>
        </BoardLink>
      )}
    </BoardRow>
  )
}

const BoardTitle = styled.div`
margin: 1rem;
color: ${({ theme }) => theme.fg1};
font-size: 23px;
font-weight: medium;
`
const BoardBody = styled.div`
margin: 1rem;
color: ${({ theme }) => theme.fg2};
font-size: 14px;
`
const BoardLink = styled(Link)`
color: ${({ theme }) => theme.fg1};
background: ${({ theme }) => theme.bg2};
text-align: left;
height: 200px;
width: 100px;
min-width: 340px;
margin: 5px;
border-radius: 10px;
`


const Item = styled(FlexGrid.Col)`
`

const BoardRow = styled(FlexGrid.Row)`
display: inline-flex;
position: relative;
flex-flow: row wrap;
justify-content: center;
overflow-y: scroll;
height: 100vh;
margin-left: 90px;
max-width: 1100px;
`

export default BoardList