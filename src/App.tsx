import { createContext, useState } from 'react'
import './App.css'
import BookTile from './components/BookTile'
import PlusButton from './components/PlusButton'

export const BooksContext = createContext()

function App() {
  const [books, setBooks] = useState([])
  function addBook(bookName, author, readStatus, bookImg) {
    setBooks((prevBooks) => {
      return([...prevBooks, {name: bookName, author: author, isRead: readStatus, img: bookImg}])
    })
  }

  function removeBook() {}
  return(
    <BooksContext.Provider value={{books, addBook}}>
      <h1 className='main-heading'>Library</h1>
      <p className='abt-heading'>Your collection of books, music, movies and TV shows.</p>
      <div className='books-section'>
        {books.length > 0 && books.map(book => (<BookTile name={book.name} authorName={book.author} bookImg={book.img} isRead={book.isRead} />))}
        <PlusButton />
      </div>
    </BooksContext.Provider>
  )
}

export default App
