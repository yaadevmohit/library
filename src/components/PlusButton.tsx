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
        <div className="input-container">
            <button className="plus-button" onClick={handleClick}>+</button>
        </div>
    )
}

export default PlusButton