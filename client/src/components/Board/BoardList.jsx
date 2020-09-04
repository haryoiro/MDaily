import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { getAll } from '../../services/access'
import { Link, Slider, Icons } from '../shared'
import { Header, Tooltip } from '..'

const layout = [{
  x: '160px',
  y: '180px',
}, {
  x: '180px',
  y: '210px',
}, {
  x: '210px',
  y: '240px',
}]

function BoardList() {
  const {
    isLoading, isError, data, error, refetch,
  } = useQuery('board', () => getAll())
  const [layoutIndex, setLayoutIndex] = useState(0)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  function parseContentFromSlate(a) {
    if (JSON.parse(a.contents.text).object) {
      const title = JSON.parse(a.contents.text).document.nodes.map((a) => a.nodes)[0][0].leaves[0].text
      return {
        title: title || 'Untitled'
      }
    }
    const [title, ...description] = JSON.parse(a.contents.text)
    return {
      title: title.children[0].text !== '' ? title.children[0].text : 'Untitled',
      description: description.map((b) => b.children[0].text).join('\n'),
    }
  }
  return (
    <>
      <Header refetch={refetch} className="header-container">
        <Slider
          value={layoutIndex}
          onChange={(e) => setLayoutIndex(e.target.value)}
          className="card-layout-slider"
        />
      </Header>

      <CardRow x={layout[layoutIndex].x} y={layout[layoutIndex].y} className="card-layout">
        {data.map((a) => (
          <CardWrapper key={a.id} className="wrapper">
            <Link to={`/board/${a.id}`} className="item">

              <div className="header">
                <div className="title">
                  {parseContentFromSlate(a)?.title}
                </div>
                <CardSettingButton>
                  <div>Copy Link</div>
                  <div>Hello</div>
                  <hr />
                  <div>Delete This Page</div>
                </CardSettingButton>
              </div>

              <div className="description">
                {parseContentFromSlate(a)?.description}
              </div>
            </Link>
          </CardWrapper>
        ))}
      </CardRow>
    </>
  )
}

const CardRow = styled.div`
display: grid;
grid-area: "content";
grid-column: 2;
grid-auto-rows: ${({ y }) => y};
grid-template-columns: repeat(auto-fill, minmax(${({ x }) => x}, 1fr));
gap: 20px;
overflow-y: scroll;
padding: 10px 120px 0 60px;
height: 100vh;

@media screen and (max-width: 550px) {
  grid-template-columns: repeat(auto-fill, minmax(${({ x }) => x}, 1fr));

  margin-top: 120px;
  padding: 10px 30px 0 30px;
}
`

const CardWrapper = styled.div`
${({ theme }) => `
display: flex;
color:  ${theme.fg1};
background: ${theme.bg2};
border-radius: 2px;
max-width: 260px;
overflow: hidden;
a {margin:0;padding:0;}
.item{
  text-align: left;
  margin-bottom: 1.2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background: none;
  }
  .header {
    display: flex;
    justify-content: right;
    margin-top: 10px;
    box-shadow: 0 -10px 0 0 #FB4934;
    .title {
      padding: 13px 0px 10px 13px;
      margin-right: 10px;
      width: 80%;
      color: ${theme.fg1};
      font-size: 14px;
      font-weight: bold;
    }
    .setting {
      width: 19%;
      margin: 15px 10px 10px 0px;
      >span{border-radius: 3px;}
      >span:hover {
        padding-top: 6px;
        background: ${theme.bg1}
      }
      svg {
        margin-left: 20px;
      }
    }
  }
  .description {
    text-overflow: ellipsis;
    height: inherit;
    padding: 0 18px 0 13px;
    color: ${theme.fg2};
    font-size: 12px;
  } /* description */
} /* item */
`}
`

// eslint-disable-next-line react/prop-types
function CardSettingButton({ children }) {
  return (
    <div onClick={(e) => e.preventDefault()} className="setting">
      <Tooltip text={<>{ children }</>}>
        <Icons.EllipsisIcon />
      </Tooltip>
    </div>
  )
}

export default BoardList
