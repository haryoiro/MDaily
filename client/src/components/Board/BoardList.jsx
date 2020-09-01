import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { getAll } from '../../services/access'
import { Link, Slider } from '../shared'
import Header from '../Header/Header'

function BoardList() {
  const {
    isLoading, isError, data, error, refetch,
  } = useQuery('board', () => getAll())
  const [sliderValue, setSliderValue] = useState(0)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  function parseContentFromSlate(a) {
    const [title, ...description] = JSON.parse(a.contents.text)
    return {
      title: title.children[0].text !== '' ? title.children[0].text : 'Untitled',
      description: description.map((b) => b.children[0].text).join('\n'),
    }
  }
  return (
    <>
      <Header refetch={refetch}>
        <Slider
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
        />
      </Header>

      <CardLayout index={sliderValue} className="card-layout">
        {data.map((a) => (
          <div key={a.id} className="card-wrapper">
            <Link to={`/board/${a.id}`} className="card-item">

              <div className="card-header">
                {parseContentFromSlate(a).title}
              </div>

              <div className="card-description">
                {parseContentFromSlate(a).description}
              </div>

            </Link>
          </div>
        ))}
      </CardLayout>
    </>
  )
}

const CardLayout = ({ index, children, className }) => {
  const layout = [{
    x: '157px',
    y: '169px',
  }, {
    x: '180px',
    y: '210px',
  }, {
    x: '220px',
    y: '260px',
  }]

  return (
    <CardRow x={layout[index].x} y={layout[index].y} className={className}>
      {children}
    </CardRow>
  )
}

const CardRow = styled.div`
display: grid;
grid-area: "content";
grid-column: 2;
grid-auto-rows: ${({ y }) => y};
grid-template-columns: repeat(auto-fit, minmax(${({ x }) => x}, 1fr));
gap: 15px;
overflow-y: scroll;
padding: 0px 120px 0 60px;
height: 100vh;
.card-wrapper {
  display: flex;
  color: ${({ theme }) => theme.fg1};
  background: ${({ theme }) => theme.bg2};
  border-radius: 5px;
  max-width: 260px;
  .card-item, a{
    text-align: left;
    margin-bottom: 1.2rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background: none;
    }
    .card-header {
      margin: 0.5rem 0.5rem;
      color: ${({ theme }) => theme.fg1};
      font-size: 18px;
      font-weight: bold;
    }
    .card-description {
      margin: 0.5rem 0.5rem;
      color: ${({ theme }) => theme.fg2};
      font-size: 12px;
    } /* description */
  } /* item */
} /* wrapper */
`

export default BoardList
