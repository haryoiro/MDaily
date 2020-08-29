import React, { useState } from 'react';
import styled from 'styled-components'
import { Grid, Link } from '../shared'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { allBoard } from './boardSlice'
import { getAll } from '../../services/access'
import { Slider } from '../shared/Slider'
import { Header } from '../../components/'

function BoardList() {
  const dispatch = useDispatch()
  const { isLoading, isError, data, error } = useQuery('board', () => getAll())
  const [sliderValue, setSliderValue] = useState(0)
  
  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  function parseTextFromSlate(a) {
    return JSON.parse(a.contents.text)
      .map(b => b.children[0].text)
      .join('\n')
  }
  
  return (
    <>
      <Header />
      <BoardLayout index={sliderValue}>
        {data.map(a =>
          <ItemWrapper key={a.id}>
            <BoardItem to={`/board/${a.id}`} key={a.id}>
              <BoardHeader>{a.title}</BoardHeader>
              <BoardBody>{parseTextFromSlate(a)}</BoardBody>
            </BoardItem>
          </ItemWrapper>
        )}
      </BoardLayout>
      <Slider
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.value)}
      />
    </>
  )
}

const BoardHeader = styled.div`
margin: 1rem;
margin-top: 0.5rem;
color: ${({ theme }) => theme.fg1};
font-size: 18px;
font-weight: medium;
`
const BoardBody = styled.div`
margin: 1rem;
color: ${({ theme }) => theme.fg2};
font-size: 14px;
`
const BoardItem = styled(Link)`
text-align: left;
margin-left: -2px;
&:hover {
  background: none;
}
`
const ItemWrapper = styled.div`
display: flex;
color: ${({ theme }) => theme.fg1};
background: ${({ theme }) => theme.bg2};
border-radius: 5px;
max-width: 260px;
`
const BoardLayout = ({ index, children }) => {
  const layout = [{
    x: '157px',
    y: '180px',
  }, {
    x: '180px',
    y: '210px',
  }, {
    x: '220px',
    y: '260px',
  }]

  return (
    <BoardRow x={layout[index].x} y={layout[index].y}>
      {children}
    </BoardRow>
  )
}

const BoardRow = styled.div`
display: grid;
grid-area: "content";
grid-column: 2;
grid-auto-rows: ${({ y }) => y};
grid-template-columns: repeat(auto-fit, minmax(${({ x }) => x}, 1fr));
gap: 15px;
overflow-y: scroll;
padding: 10px 20px;
margin: 0px 60px 0px 60px;
height: 100vh;
`

export default BoardList