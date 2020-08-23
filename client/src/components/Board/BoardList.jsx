import React from 'react';
import { useQuery } from 'react-query'
import { getAll } from '../../services/access'
import { Link } from 'react-router-dom'

export function BoardList() {
  const { isLoading, isError, data, error } = useQuery('board', getAll)

  /* TODO */
  // ローディング, エラー時に表示させる特定のコンポーネントを作成
  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div>
      {data.map(a =>
        <Link to={`/board/${a.id}`} key={a.id}>
          <h2>{a.title}</h2>
          <div>
            {JSON.parse(a.contents.text)
              .map(b => b.children[0].text)
              .join('\n')}
          </div>
        </Link>
      )}
    </div>
  )
}


