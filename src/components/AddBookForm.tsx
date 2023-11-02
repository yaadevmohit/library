import { useState } from "react"
import PlusButton from "./PlusButton"
import BookTile from "./BookTile"

const AddBookForm = () => {
    const [formData, setFormData] = useState(
                                    {name: "", 
                                    author: "",
                                    isRead: "Read",
                                    img: "https://via.placeholder.com/128x192.png?text=Error"
                                    })
    const [formStatus, setFormStatus] = useState({isSubmit: false, isCancelled: false})

    async function getBookInfo(bookName, authorName) {
       try { const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${authorName}`);
        const data = await response.json()
        if(data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo;
            const correctedTitle = book.title;
            const correctedAuthor = book.authors[0];
            const bookImage = book.imageLinks.thumbnail;
            return {
                correctedTitle,
                correctedAuthor,
                bookImage
            }
        } else {
            return {
                error: "Book not found"
            }
        } 
    } catch(error) {
            return {
                error: 'Error fetching book information'
            }
        }
    }
    function handleCancel(e) {
        e.preventDefault()

        setFormStatus(prevStatus => {
            return {
                ...prevStatus,
                isCancelled: true
            }
        })
    }
    
    const handleInputChange = (event) => {
		const { id, value } = event.target
		setFormData((prevData) => {
			return {
				...prevData,
				[id]: value,
			}
		})
	}

    const handleSumbit = (e) => {
        e.preventDefault()
        getBookInfo(formData.name, formData.author)
        .then((result) => {
            if(result.error) {
                console.log(result.error)
                return result.error
            } else {
                setFormData((prevData) => {
                    return (
                        {...prevData,
                        name: result.correctedTitle,
                        author: result.correctedAuthor,
                        img: result.bookImage
                        }
                    )
                })
            }
        })
        setFormStatus((prevData => {
            return({
                ...prevData,
                isSubmit: true
            })
        }))
    }
 return (
    formStatus.isCancelled ? (
        <PlusButton />
    )
    :
    formStatus.isSubmit ? (
        <>
        <BookTile 
            name={formData.name} 
            authorName={formData.author}
            bookImg={formData.img}
            isRead={formData.isRead}
        />
        <PlusButton />
        </>
    )
    :
    <form action="" className="input-container">
        <input 
            type="text" 
            placeholder="Enter Book name" 
            onChange={handleInputChange} 
            id="name" 
            value={formData.name}/>
        <input 
            type="text" 
            placeholder="Enter Author name" 
            onChange={handleInputChange} 
            id="author" 
            value={formData.author}
        />
        <select name="is-read" id="isRead" onChange={handleInputChange}>
            <option value="Read">Read</option>
            <option value="Not Read">Not Read</option>
        </select>
        <div className="btn-container">
            <button className="add-btn" type="submit" onClick={handleSumbit}>Add</button>
            <button className="cancel-btn" onClick={(e) => handleCancel(e)}>Cancel</button>
        </div>
    </form>
 )   
}

export default AddBookForm