// @ts-nocheck
import { useContext, useState } from "react"
import AddBookForm from "./AddBookForm"
import "./styles/plus-button.css"
import { BooksContext } from "../App"
const PlusButton = () => {
    const { books } = useContext(BooksContext)
    const [plusClicked, setPlusClicked] = useState(false)
    function handleClick() {
        setPlusClicked(prevState => !prevState)
    }
    return(
        plusClicked 
        ? 
        <AddBookForm cancelStatus={false}/> 
        :
        <div className="input-container plus">
            <button className="plus-button" onClick={handleClick}>+</button>
            {books.length < 1 && <span className="plus-btn-info">Add a book</span>}
        </div>
    )
}

export default PlusButton