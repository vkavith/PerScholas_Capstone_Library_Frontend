// src/components/AddBooks.jsx
import { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./AddBooks.css";
import API from "../api/config";

function AddBook() {
  // State to manage book input fields
  const [bookData, setBookData] = useState({
    bookName: "",
    isbn: "",
    author: "",
    category: "",
    stock: 1,
    imageUrl: "",
  });

  // Handle form submission for adding new books or adding stock to existing book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data: books } = await axios.get(
      //  "http://localhost:5000/api/books"
      // Check if book already exists in the database
      const { data } = await axios.get(`${API}/api/books`);
      const existingBook = data.find((book) => book.isbn === bookData.isbn);

      if (existingBook) {
        // If book exists, update its stock
        const updatedBook = {
          ...existingBook,
          stock: existingBook.stock + parseInt(bookData.stock),
        };

        await axios.put(`${API}/api/books/${existingBook._id}`, updatedBook);
        alert("Book stock updated successfully!");
      } else {
        // If book is new, add it to the database
        await axios.post(`${API}/api/books`, bookData);
        alert("New book added successfully!");
      }

      // Reset form fields after submission
      setBookData({
        bookName: "",
        isbn: "",
        author: "",
        category: "",
        stock: 1,
        imageUrl: "",
      });
    } catch (error) {
      // Handle any errors during book addition
      console.error("Error:", error);
      alert("Error adding/updating book");
    }
  };

  return (
    <div className="add-book-page">
      <Sidebar />
      <div className="bookinfo">
        <div className="header">
          <h1>Add New Book</h1>
          <p>Enter book details below</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Book Name Input */}
            <div className="form-field">
              <label>Book Name</label>
              <input
                type="text"
                value={bookData.bookName}
                onChange={(e) =>
                  setBookData({ ...bookData, bookName: e.target.value })
                }
                required
                placeholder="Enter book name"
              />
            </div>

            {/* ISBN Input */}
            <div className="form-field">
              <label>ISBN</label>
              <input
                type="text"
                value={bookData.isbn}
                onChange={(e) =>
                  setBookData({ ...bookData, isbn: e.target.value })
                }
                required
                placeholder="Enter ISBN"
              />
            </div>

            {/* Author Input */}
            <div className="form-field">
              <label>Author</label>
              <input
                type="text"
                value={bookData.author}
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                required
                placeholder="Enter author name"
              />
            </div>

            {/* Genre Input */}
            <div className="form-field">
              <label>Genre</label>
              <input
                type="text"
                value={bookData.category}
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
                required
                placeholder="Enter category"
              />
            </div>

            {/* Stock Input */}
            <div className="form-field">
              <label>Stock</label>
              <input
                type="number"
                value={bookData.stock}
                onChange={(e) =>
                  setBookData({ ...bookData, stock: parseInt(e.target.value) })
                }
                required
                min="1"
              />
            </div>

            {/* Image URL Input */}
            <div className="form-field">
              <label>Image URL</label>
              <input
                type="url"
                value={bookData.imageUrl}
                onChange={(e) =>
                  setBookData({ ...bookData, imageUrl: e.target.value })
                }
                placeholder="Enter image URL"
              />
            </div>
            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
