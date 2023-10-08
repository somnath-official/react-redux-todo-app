import React, { useEffect, useState } from 'react'
import './Todo.css'
import TodoItem from './TodoItem/TodoItem'
import { TodoObject } from '../../@types/todo'
import type { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import { addTodo } from '../../store/todo/todoSlice'

const Todo = () => {
  const data = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch()
  
  const [todos, setTodos] = useState<Array<TodoObject>>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTodoData, setNewTodoData] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    let result = data
    if (searchTerm) {
      result = data.filter((todo) => {
        if (
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) return todo
      })
    }
    
    setTodos(result)
  }, [data, searchTerm])

  function setData(name: string, value: string) {
    switch(name) {
      case 'title':
        setNewTodoData({...newTodoData, title: value})
        break
      case 'description':
        setNewTodoData({...newTodoData, description: value})
    }
  }

  function openAddTodoModal() {
    setNewTodoData({ title: '', description: '' })
    setShowAddModal(true)
  }

  function addNewTodo() {
    if (!newTodoData.title || !newTodoData.description) return

    dispatch(addTodo(newTodoData))
    setNewTodoData({ title: '', description: '' })
    setShowAddModal(false)
  }

  return (
    <>
      <div className='todo-header-action-container'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search Todo...'
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if ((e.target as HTMLInputElement).value) {
                setSearchTerm((e.target as HTMLInputElement).value)
              } else {
                setSearchTerm('')
              }
            }}
          />
        </div>
        <button className='btn btn-rounded' onClick={openAddTodoModal}>Add New</button>
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

      <Modal show={showAddModal} onClose={() => {setShowAddModal(false)}}>
        <div>
          <h3 className='add-todo-text'>Add new todo</h3>
          <form className='add-todo-form'>
            <input
              type='text'
              placeholder='Enter todo title'
              onChange={(e) => setData('title', e.target.value)}
              value={newTodoData.title}
            />
            <textarea
              rows={2}
              cols={4}
              placeholder='Enter todo description'
              onChange={(e) => setData('description', e.target.value)}
              value={newTodoData.description}
            >
            </textarea>
          </form>
          <div className='add-todo-action-container'>
            <button
              className='btn close-btn btn-primary btn-rounded'
              onClick={() => {setShowAddModal(false)}}
            >
              Close
            </button>
            <button
              className='btn btn-success btn-rounded'
              onClick={addNewTodo}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Todo