import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useQuery, useMutation, queryCache } from 'react-query'
import { getAll, getDataById } from '../../services/access'
import { Link, useParams } from 'react-router-dom'

export function BoardList() {
  const { isLoading, isError, data, error } = useQuery('board', getAll)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>
  console.log(data)

  return (
    <div>
      {data.map(a =>
        <Link to={`/board/${a.id}`} key={a.id}>
          <h2>{a.title}</h2>
        </Link>
      )}
    </div>
  )
}


