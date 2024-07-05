
import { useContext, useState } from "react"
import PlusButton from "./PlusButton"
import { BooksContext } from "../App";
import "./styles/book-form.css"
import axios from "axios";

interface AddBookFormProps {
    cancelStatus: boolean
}

interface FormData {
    name: string;
    author: string;
    isRead: string;
    img: string;
}

interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

interface VolumeInfo {
    title: string;
    authors: string[];
    imageLinks: ImageLinks;
    [key: string]: unknown;
}
interface BookItem {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
}

interface Data {
    kind: string;
    totalItems: number;
    items: BookItem[];
}


const AddBookForm: React.FC<AddBookFormProps> = ({cancelStatus}) => {
    
    // All the states for book content, form content and form status to show the plus sign
    const { addBook } = useContext(BooksContext)
    const [formData, setFormData] = useState<FormData>(
                                    {name: "", 
                                    author: "",
                                    isRead: "Read",
                                    img: "https://via.placeholder.com/128x192.png?text='img not found'"
                                    })
    const [formStatus, setFormStatus] = useState({isSubmitted: false, isCancelled: cancelStatus})

    // getting data from books api
    async function getBookInfo(bookName: string, authorName: string) {
       try { 
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${authorName}`);
        const data: Data = await response.json()

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

    // changes formStatus state
    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        setFormStatus(prevStatus => {
            return {
                ...prevStatus,
                isCancelled: true
            }
        })
    }
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target
		setFormData((prevData) => {
			return {
				...prevData,
				[id]: value,
			}
		})
	}

    const validateBookName = (bookName: string) => {
        const bookNameRegex = /^[a-zA-Z0-9\s,'".!?()-]+$/;
        return bookNameRegex.test(bookName);
    }

    const handleSumbit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        validateBookName(formData.name) 
        && 
        getBookInfo(formData.name, formData.author)
        .then((result) => {
            if(result.error) {
                addBook(formData.name, formData.author, formData.isRead, formData.img)
            } else {
                setFormData(prevData => {
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
                            isSubmitted: true
                            })
                    }))
            }
        )
        }
 return (
    formStatus.isCancelled || formStatus.isSubmitted 
    ? 
    <PlusButton />
    :
    <form action="" className="input-container">
        <div className="input-field">
            <input 
                type="text" 
                placeholder="Enter Book name" 
                onChange={handleInputChange} 
                id="name" 
                value={formData.name}
            />
            {!validateBookName(formData.name) && <span>needs a book name</span>}
        </div> 
        <div className="input-field">   
            <input 
                type="text" 
                placeholder="Enter Author name" 
                onChange={handleInputChange} 
                id="author" 
                value={formData.author}
            />
        </div>
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