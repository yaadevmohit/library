import { createContext, useState } from 'react'
import './App.css'
import BookTile from './components/BookTile'
import PlusButton from './components/PlusButton'

export const BooksContext = createContext({})
interface Book {
  name: string;
  author: string;
  isRead: string;
  img: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([])
  function addBook(bookName: string, authorName: string, readStatus: string, bookImg: string) {
    setBooks((prevBooks) => {
      return([...prevBooks, {name: bookName, author: authorName, isRead: readStatus, img: bookImg}])
    })
  }

  function removeBook(bookName: string) {
    setBooks(books.filter(book => book.name !== bookName));
  }
  return(
    <BooksContext.Provider value={{books, addBook, removeBook}}>
      <h1 className='main-heading'>Library</h1>
      <p className='abt-heading'>Your collection of favourite books.</p>
      <div className='books-section'>
        {books.length > 0 && books.map(book => (<BookTile name={book.name} authorName={book.author} bookImg={book.img} isRead={book.isRead} />))}
        <PlusButton />
      </div>
    </BooksContext.Provider>
  )
}

export default App
