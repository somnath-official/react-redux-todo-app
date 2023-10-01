import './Todo.css'

const Todo = () => {
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
      </div>
    </>
  )
}

export default Todo