// src/components/DeleteBooks.jsx
// Component for managing book deletion functionality
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./DeleteBooks.css";
import API from "../api/config";

function DeleteBook() {
  // State management for books list and selected book
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  
  //Fetch Books
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

  // Handle book selection from dropdown
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  // Handle book deletion with confirmation
  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this book?")) {
      try {
        await axios.delete(`${API}/api/books/${selectedBook._id}`);
        alert("Book deleted successfully!");

        // Refresh book list after deletion
        const { data } = await axios.get(`${API}/api/books`);
        setBooks(data);

        // Reset selection
        setSelectedBook(null);
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting book");
      }
    }
  };

  return (
    <div className="delete-book-page">
      <Sidebar />
      <div className="bookinfo">
        <div className="header">
          <h1>Delete Book</h1>
          <p>Select a book to delete from collection</p>
        </div>

        {/* Book selection dropdown */}
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
            <option value="">Select a book to delete</option>
            {books.map((book, index) => (
              <option key={book._id} value={index}>
                {book.bookName} (ISBN: {book.isbn})
              </option>
            ))}
          </select>
        </div>

        {/* Book details display */}
        {selectedBook && (
          <div className="form-container">
            <div className="book-details">
              <div className="detail-row">
                <label>Book Name:</label>
                <span>{selectedBook.bookName}</span>
              </div>
              <div className="detail-row">
                <label>ISBN:</label>
                <span>{selectedBook.isbn}</span>
              </div>
              <div className="detail-row">
                <label>Author:</label>
                <span>{selectedBook.author}</span>
              </div>
              <div className="detail-row">
                <label>Genre:</label>
                <span>{selectedBook.category}</span>
              </div>
              <div className="detail-row">
                <label>Stock:</label>
                <span>{selectedBook.stock}</span>
              </div>

              <button onClick={handleDelete} className="delete-button">
                Delete Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteBook;
