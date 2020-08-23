import React from 'react';

import { Link } from 'react-router-dom'

export function BoardList({ data }) {
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


