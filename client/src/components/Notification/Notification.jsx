import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNotification,
} from './notificationSlice'

function Notification() {
  const message = useSelector(selectNotification)
  return (
    <p>{message}</p>
  )
}

export default Notification