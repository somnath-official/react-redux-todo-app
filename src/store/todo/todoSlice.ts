import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateToDoObject, TodoObject } from '../../@types/todo'
import { allTodos } from '../../todos'

const initialState: Array<TodoObject> = allTodos

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<CreateToDoObject>) => {
      state.push({
        id: +new Date(),
        title: action.payload.title,
        description: action.payload.description,
        is_complete: false,
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString()
      })
    },
    completeTodo: (state, action: PayloadAction<{id: number|undefined}>) => {
      state.map((item) => {
        if (item.id === action.payload.id) item.is_complete = true
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, completeTodo } = todoSlice.actions

export default todoSlice.reducer