// @ts-nocheck
import { useContext, useState } from "react"
import PlusButton from "./PlusButton"
import { BooksContext } from "../App";
import "./styles/book-form.css"

interface AddBookFormProps {
    cancelStatus: boolean
}

interface FormData {
    name: string;
    author: string;
    isRead: string;
    img: string;
}

const AddBookForm: React.FC<AddBookFormProps> = ({cancelStatus}) => {
    const { addBook } = useContext(BooksContext)
    const [formData, setFormData] = useState<FormData>(
                                    {name: "", 
                                    author: "",
                                    isRead: "Read",
                                    img: "https://via.placeholder.com/128x192.png?text=Error"
                                    })
    const [formStatus, setFormStatus] = useState({isSubmit: false, isCancelled: cancelStatus})
    async function getBookInfo(bookName: string, authorName: string) {
       try { const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${authorName}`);
        const data: unknown = await response.json()

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
                return result.error
            } else {
                setFormData((prevData) => {
                    return (
                        {...prevData,
                        name: result.correctedTitle,
                        author: result.correctedAuthor,
                        img: result.bookImage
                    })
                })
                addBook(result.correctedTitle, result.correctedAuthor, formData.isRead, result.bookImage)
                }
                    
                    setFormStatus((prevData => {
                        return({
                            ...prevData,
                            isSubmit: true
                            })
                        }))
            })
        }
 return (
    formStatus.isCancelled || formStatus.isSubmit 
    ? 
    <PlusButton />
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