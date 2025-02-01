import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./EditBooks.css";
import API from "../api/config";

function EditBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editData, setEditData] = useState({
    author: "",
    category: "",
    stock: 0,
  });

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/books`);
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setEditData({
      author: book.author,
      category: book.category,
      stock: book.stock,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/books/${selectedBook._id}`, {
        ...selectedBook,
        ...editData,
      });
      alert("Book updated successfully!");

      // Refresh book list
      const { data } = await axios.get(`${API}/api/books`);
      setBooks(data);

      // Reset selection
      setSelectedBook(null);
      setEditData({
        author: "",
        category: "",
        stock: 0,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating book");
    }
  };

  return (
    <div className="edit-book-page">
      <Sidebar />
      <div className="bookinfo">
        <div className="header">
          <h1>Edit Book</h1>
          <p>Select a book to edit its details</p>
        </div>

        <div className="book-selection">
          <select
            onChange={(e) => handleBookSelect(books[e.target.value])}
            value={
              selectedBook
                ? books.findIndex((b) => b._id === selectedBook._id)
                : ""
            }
            className="book-select"
          >
            <option value="">Select a book</option>
            {books.map((book, index) => (
              <option key={book._id} value={index}>
                {book.bookName} (ISBN: {book.isbn})
              </option>
            ))}
          </select>
        </div>

        {selectedBook && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Book Name</label>
                <input
                  type="text"
                  value={selectedBook.bookName}
                  disabled
                  className="disabled-input"
                />
              </div>

              <div className="form-field">
                <label>ISBN</label>
                <input
                  type="text"
                  value={selectedBook.isbn}
                  disabled
                  className="disabled-input"
                />
              </div>

              <div className="form-field">
                <label>Author</label>
                <input
                  type="text"
                  value={editData.author}
                  onChange={(e) =>
                    setEditData({ ...editData, author: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label>Category</label>
                <input
                  type="text"
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label>Stock</label>
                <input
                  type="number"
                  value={editData.stock}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      stock: parseInt(e.target.value),
                    })
                  }
                  required
                  min="0"
                />
              </div>

              <button type="submit" className="submit-button">
                Update Book
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditBook;
