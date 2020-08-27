import { createSlice } from '@reduxjs/toolkit';
import { getAll } from '../../services/access'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
  },
  reducers: {
    setBoardList: (state, { payload }) => {
      state.list = payload
    }
  },
})

export const { setBoardList } = boardSlice.actions

export const allBoard = () => async dispatch => {
  const list = await getAll()
  await dispatch(setBoardList(list))
}

export const selectBoard = state => state.board

export default boardSlice.reducer
