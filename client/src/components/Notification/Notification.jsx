import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessage,
  selectNotification,
} from './notificationSlice'

export function Notification() {

  const message= useSelector(selectNotification)

  return (
    <p>{message}</p>
  )
}