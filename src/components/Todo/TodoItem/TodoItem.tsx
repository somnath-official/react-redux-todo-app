import { useEffect, useState } from "react"
import './TodoItem.css'
import { TodoObject, UpdateToDoObject } from "../../../@types/todo"
import { useDispatch } from "react-redux"
import { completeTodo, deleteTodo, updateTodo } from "../../../store/todo/todoSlice"
import Modal from "../../Modal/Modal"

export interface TodoItemIntrface {
  todo: TodoObject
}

const TodoItem = (props: TodoItemIntrface) => {
  const dispatch = useDispatch()

  const [todo, setTodo] = useState<TodoObject|undefined>()
  const [showEditModal, setShowEditModal] = useState(false)
  const [editTodoData, setEditTodoData] = useState<UpdateToDoObject>({
    id: 0,
    title: '',
    description: '',
  })
  
  useEffect(() => {
    setTodo(props.todo)
  }, [props])

  function setData(name: string, value: string) {
    switch(name) {
      case 'title':
        setEditTodoData({...editTodoData, title: value})
        break
      case 'description':
        setEditTodoData({...editTodoData, description: value})
    }
  }

  function openEditModal() {
    setEditTodoData({
      id: todo!.id,
      title: todo!.title,
      description: todo!.description,
    })
    setShowEditModal(true)
  }

  function saveTodo() {
    if (!editTodoData.title || !editTodoData.description) return

    dispatch(updateTodo(editTodoData))
    setEditTodoData({
      id: 0,
      title: '',
      description: '',
    })
    setShowEditModal(false)
  }

  return (
    <div className='todo-details'>
      <h3 className='todo-title'>{todo?.title}</h3>
      <p className='todo-description'>{todo?.description}</p>
      <div className='todo-action'>
        <span className='todo-date'>{todo?.created_at}</span>
        <div style={{display: 'flex'}}>
          {
            !todo?.is_complete
            ? <>
                <button className='btn btn-rounded' onClick={() => dispatch(completeTodo({id: todo?.id}))}>
                  <svg className='icon' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style={{fill:"#C2FB3B"}} d="M505.182,113.795l-65.836-65.834c-9.089-9.09-23.827-9.089-32.917,0L256,198.392l-84.594,84.594 l-65.839-65.839c-4.365-4.365-10.285-6.817-16.459-6.817c-6.173,0-12.094,2.452-16.458,6.818L6.818,282.988 c-9.09,9.09-9.09,23.827,0,32.917l148.124,148.133c4.363,4.365,10.285,6.817,16.458,6.817c6.174,0,12.094-2.453,16.458-6.817 l68.141-68.141l249.184-249.184c4.365-4.365,6.818-10.285,6.818-16.458C511.999,124.081,509.547,118.16,505.182,113.795z"></path> <path style={{fill:"#9CDD05"}} d="M154.942,464.039c4.363,4.365,10.285,6.818,16.458,6.818c6.174,0,12.094-2.453,16.458-6.818 l68.141-68.141V198.394l-84.594,84.594l-65.839-65.839c-4.365-4.365-10.285-6.817-16.458-6.817c-6.173,0-12.094,2.452-16.458,6.818 L6.818,282.988c-9.09,9.09-9.09,23.827,0,32.917L154.942,464.039z"></path> </g></svg>
                </button>
                <button className='btn btn-rounded' onClick={openEditModal}>
                  <svg className='icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
              </>
            : ''
          }
          <button className='btn btn-rounded' onClick={() => dispatch(deleteTodo({id: todo?.id}))}>
            <svg className='icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </button>
        </div>
      </div>

      <Modal show={showEditModal} onClose={() => {setShowEditModal(false)}}>
        <div>
          <h3 className='add-todo-text'>Add new todo</h3>
          <form className='add-todo-form'>
            <input
              type='text'
              placeholder='Enter todo title'
              onChange={(e) => setData('title', e.target.value)}
              value={editTodoData.title}
            />
            <textarea
              rows={2}
              cols={4}
              placeholder='Enter todo description'
              onChange={(e) => setData('description', e.target.value)}
              value={editTodoData.description}
            >
            </textarea>
          </form>
          <div className='add-todo-action-container'>
            <button
              className='btn close-btn btn-primary btn-rounded'
              onClick={() => {setShowEditModal(false)}}
            >
              Close
            </button>
            <button
              className='btn btn-success btn-rounded'
              onClick={saveTodo}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TodoItem