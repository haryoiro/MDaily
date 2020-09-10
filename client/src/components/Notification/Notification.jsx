import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectNotification } from './notificationSlice'

function Notification() {
  const message = useSelector(selectNotification)

  return (
    <Center>
      <StyledNotification>{message}</StyledNotification>
    </Center>
  )
}

const StyledNotification = styled.div`
justify-content: center;
margin-left: auto;
margin-right: auto;
`
const Center = styled.div`
display: flex;
position: absolute;
width: 100vw;
left: 0;
top: 0;
`

export default Notification
