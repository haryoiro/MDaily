import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../../services/access'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
  },
  reducers: {
    setBoardList: (state, { payload }) => {
      state.board = payload
    },
    setBoardById: (state, { payload }) => {
      console.log(payload)
      console.log(state.board)
    },
  },
})

export const {
  setBoardList,
  setBoardById,
} = boardSlice.actions

export const allBoard = () => async (dispatch) => {
  const list = await getAll()
  console.log(list)
  await dispatch(setBoardList(list))
}

export const selectBoard = (state) => state.board

export default boardSlice.reducer
