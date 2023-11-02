import { useState } from "react"
import AddBookForm from "./addBookForm"

const PlusButton = () => {
    const [plusClicked, setPlusClicked] = useState(false)
    function handleClick() {
        setPlusClicked(prevState => !prevState)
    }
    return(
        plusClicked 
        ? 
        <AddBookForm /> 
        :
        <div className="input-container plus">
            <button className="plus-button" onClick={handleClick}>+</button>
            <span className="plus-btn-info">Add an item</span>
        </div>
    )
}

export default PlusButton