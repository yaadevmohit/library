import { useState } from 'react'
import './App.css'
import AddBookForm from './components/addBookForm'
import PlusButton from './components/plusButton'
import BookTile from './components/BookTile'
function App() {
  const [books, setBooks] = useState([])

  return(
    <>
      <h1 className='main-heading'>Library</h1>
      <p className='abt-heading'>Your collection of books, music, movies and TV shows.</p>
      <div className='books-section'>
        <PlusButton />
      </div>
    </>
  )
}

export default App
