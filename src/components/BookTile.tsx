import "./styles/book-tile.css"
const BookTile = ({name, authorName, bookImg, isRead}) => {


    return (
        <>
           <div className="book">
            {bookImg ? <img src={bookImg} alt="" className="book-img"/> : <p>No Image Available</p>}
            <h2 className="book-name">{name}</h2>
            <p className="book-author">{authorName}</p>
            <div className="book-btns">
                <button className="book-btn status">{isRead}</button>
                <button className="book-btn delete">Remove</button>
            </div>
           </div>
        </>
    )
}

export default BookTile