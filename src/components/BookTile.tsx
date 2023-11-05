import { useState } from "react"
import "./styles/book-tile.css"

interface BookTileProps {
    name: string;
    authorName: string;
    bookImg: string;
    isRead: string;
}

const BookTile: React.FC<BookTileProps> = ({name, authorName, bookImg, isRead}) => {
    const [read, setRead] = useState(isRead)

    function handleRead() {
        if (read === "Read") {
            setRead("Not Read")
        }
        else if (read === "Not Read") {
            setRead("Read")
        }
    }
    return (
        <>
           <div className="book">
            {bookImg ? <img src={bookImg} alt="" className="book-img"/> : <p>No Image Available</p>}
            <h2 className="book-name">{name}</h2>
            <p className="book-author">{authorName}</p>
            <div className="book-btns">
                <button className="book-btn status" onClick={handleRead}>{read}</button>
                <button className="book-btn delete">Remove</button>
            </div>
           </div>
        </>
    )
}

export default BookTile