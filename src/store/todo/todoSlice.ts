import { createSlice } from '@reduxjs/toolkit'
import { TodoObject } from '../../@types/todo'
import { allTodos } from '../../todos'

const initialState: Array<TodoObject> = allTodos

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = todoSlice.actions

export default todoSlice.reducer