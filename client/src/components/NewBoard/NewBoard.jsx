import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, queryCache } from 'react-query'
import { useDispatch } from 'react-redux'

import styled from '@emotion/styled'

import { asyncNotification } from '../Notification/notificationSlice'
// API Access
import { createNew } from '../../services/access'
// StyledIcon
import { Icons } from '../shared'

function NewBoard() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [createNote] = useMutation(createNew, {
    onSuccess: async () => {
      queryCache.invalidateQueries('board')
      await dispatch(asyncNotification('Content Created'))
    },
    onError: async (_, error) => {
      await dispatch(asyncNotification(error.message))
    },
  })

  async function onCreateNew() {
    const { id } = await createNote()
    history.push(`/board/${id}`)
  }

  return (
    <StyledNewBoard onClick={onCreateNew}>
      <Icons.PlusIcon />
    </StyledNewBoard>
  )
}

const StyledNewBoard = styled.div`
display: flex;
float: right;
margin: 12.5px;
cursor: pointer;
:hover {
  background: ${({ theme }) => theme.bg2};
}
`

export default NewBoard
