import { useEffect, useState } from 'react'
import './Todo.css'
import { TodoObject, allTodos } from '../../todos'
import TodoItem from './TodoItem/TodoItem'

const Todo = () => {
  const [todos, setTodos] = useState<Array<TodoObject>>([])

  useEffect(() => {
    setTodos(allTodos)
  }, [])

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