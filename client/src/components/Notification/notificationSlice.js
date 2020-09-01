import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
  },
  reducers: {
    setMessage: (state, { payload }) => {
      state.message = payload
      return state
    },
  },
})

export const { setMessage } = notificationSlice.actions

export const asyncNotification = (message) => async (dispatch) => {
  await dispatch(setMessage(message))
  await setTimeout(() => {
    dispatch(setMessage(''))
  }, 5000)
}

export const selectNotification = (state) => state.notification.message

export default notificationSlice.reducer
