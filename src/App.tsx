import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Todo from './components/Todo/Todo'

function App() {
  return (
    <>
      <Header />
      <main className='main-section'>
        <Todo />
      </main>
      <Footer />
    </>
  )
}

export default App
