import { useEffect, useState } from 'react'
import './Todo.css'
import TodoItem from './TodoItem/TodoItem'
import { TodoObject } from '../../@types/todo'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'

const Todo = () => {
  const [todos, setTodos] = useState<Array<TodoObject>>([])
  const data = useSelector((state: RootState) => state.todo)

  useEffect(() => {
    setTodos(data)
  }, [data])

  return (
    <>
      <div className='todo-header-action-container'>
        <div className='search-container'>
          <input type='text' placeholder='Search Todo...'/>
          <button className='btn'>Search</button>
        </div>
        <button className='btn btn-rounded'>Add New</button>
      </div>
      <div className="todo-container">
        <h1 className='todo-text'>Your Todos</h1>
        <div className='todo-lists'>
          {
            !todos.length
            ? <div className='no-todos'>No Todos.</div>
            : <>
                {
                  todos.map(todo => {
                    return (
                      <div
                        key={todo.id}
                        className={
                          `single-todo ${todo.is_complete ? 'completed' : ''}`
                        }
                      >
                        <TodoItem todo={todo}/>
                      </div>
                    )
                  })
                }
              </>
          }
        </div>
      </div>
    </>
  )
}

export default Todo