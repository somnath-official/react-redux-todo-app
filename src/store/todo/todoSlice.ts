import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateToDoObject, TodoObject } from '../../@types/todo'
import { allTodos } from '../../data/todos'

const initialState: Array<TodoObject> = allTodos

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<CreateToDoObject>) => {
      state.unshift({
        id: +new Date(),
        title: action.payload.title,
        description: action.payload.description,
        is_complete: false,
        is_deleted: false,
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString()
      })
    },
    completeTodo: (state, action: PayloadAction<{id: number|undefined}>) => {
      state.map((item) => {
        if (item.id === action.payload.id) item.is_complete = true
      })
    },
    deleteTodo: (state, action: PayloadAction<{id: number|undefined}>) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.is_deleted = true
          item.deleted_at = new Date().toDateString()
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer