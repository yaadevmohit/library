const AddBookForm = () => {
 return (
    <form action="" className="input-container">
        <input type="text" placeholder="Enter Book name"/>
        <input type="text" placeholder="Enter Author name"/>
        <select name="is-read" id="is-read">
            <option value="read">Read</option>
            <option value="not-read">Not Read</option>
        </select>
        <div className="btn-container">
            <button className="add-btn">Add</button>
            <button className="cancel-btn">Cancel</button>
        </div>
    </form>
 )   
}

export default AddBookForm