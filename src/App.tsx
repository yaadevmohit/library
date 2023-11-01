import { useState } from 'react'
import './App.css'
import AddBookForm from './components/addBookForm'
import PlusButton from './components/plusButton'
function App() {
  const [books, setBooks] = useState([])

  return(
    <>
      <h1>Library</h1>
      <p>Your collection of books, music, movies and TV shows.</p>
      <div className='books-section'>
        <PlusButton />
      </div>
    </>
  )
}

export default App
