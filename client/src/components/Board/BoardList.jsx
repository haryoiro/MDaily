import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useQuery, useMutation } from 'react-query'
import { getAll, deleteDataById } from '../../services/access'
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
  const [deleteContent] = useMutation(deleteDataById, {
    onSuccess: async () => {
      await refetch()
    },
  })
  const [layoutIndex, setLayoutIndex] = useState(0)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  function parseContentFromSlate(a, type) {
    if (type === 'title') {
      const b = a.contents.text[0].children[0].children[0].text
      return b
    }
    if (type === 'description') {
      const b = a.contents.text[0].children.map((a) => a.children[0].text).splice(0).join('\n')
      return b
    }
  }
  function onDelete(e, id) {
    e.preventDefault()
    if (window.confirm('本当に削除しますか？')) {
      deleteContent({ id })
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
                  {parseContentFromSlate(a, 'title')}
                </div>
                <CardSettingButton>
                  <div>Copy Link</div>
                  <div>Hello</div>
                  <hr />
                  <button
                    type="button"
                    onClick={(e) => onDelete(e, a.id)}
                  >
                    Delete This Page
                  </button>
                </CardSettingButton>
              </div>

              <div className="description">
                {parseContentFromSlate(a, 'description')}
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
padding: 10px 120px 0 35px;
height: 100vh;

@media screen and (max-width: 550px) {
  grid-template-columns: repeat(auto-fill, minmax(${({ x }) => x}, 1fr));

  margin-top: 60px;
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
    <div className="setting">
      <Tooltip text={<>{ children }</>}>
        <Icons.EllipsisIcon />
      </Tooltip>
    </div>
  )
}

export default BoardList
