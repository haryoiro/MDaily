import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../components/Notification/notificationSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
