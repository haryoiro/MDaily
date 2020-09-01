import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../components/Notification/notificationSlice'
import boardReducer from '../components/Board/boardSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    board: boardReducer,
  },
})
