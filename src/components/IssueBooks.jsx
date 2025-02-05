// IssueBook component for managing book lending
// src/components/IssueBooks.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import API from "../api/config";
import "./IssueBooks.css";

function IssueBook() {
  const [books, setBooks] = useState([]);   // Available books
  const [users, setUsers] = useState([]);   // Registered users
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');     // Status messages
  const [bookInfo, setBookInfo] = useState(null); // Selected book details
  const [userInfo, setUserInfo] = useState(null);  // Selected user details

  // Clear messages after timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch all books and all users
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API}/api/books`);
        setBooks(response.data);
      } catch (error) {
        setMessage("Error loading books");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/api/users`);
        setUsers(response.data);
      } catch (error) {
        setMessage("Error loading users");
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  // Update book details when selection changes
  const handleBookDetail = (e) => {
    const bookId = e.target.value;
    setSelectedBook(bookId);

    if (bookId) {
      const selectedBookDetails = books.find((book) => book._id === bookId);
      setBookInfo(selectedBookDetails);
    } else {
      setBookInfo(null);
    }
  };

  // Update user details when selection changes 
  const handleUserDetail = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    if (userId) {
      const selectedUserDetails = users.find((user) => user._id === userId);
      setUserInfo(selectedUserDetails);
    } else {
      setUserInfo(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedBook || !selectedUser) {
      setMessage("Please select both book and user");
      return;
    }

    try {
      const response = await axios.post(`${API}/api/issuetransactions`, {
        book: selectedBook,
        user: selectedUser,
      });

      // Reset form and refresh books
      if (response.data) {
        setMessage("Book issued successfully!");
        setSelectedBook('');
        setSelectedUser('');
        setBookInfo(null);
        setUserInfo(null);
        // Refresh book list to update stock
        const bookResponse = await axios.get(`${API}/api/books`);
        setBooks(bookResponse.data);
      }
    } catch (error) {
      if (error.response) {
        // Use the error message from the backend
        setMessage(error.response.data.message);
      } else {
        setMessage("Error issuing book");
      }
    }
  };

  return (
    <div className="issue-book-page">
      <Sidebar />
      <div className="issue-content">
        <h1>Issue Book</h1>

        {/* Book issuing form */}
        <form onSubmit={handleSubmit} className="issue-form">
          {/* Book selection dropdown */}
          <div className="form-group">
            <label>Select Book</label>
            <select
              value={selectedBook}
              onChange={handleBookDetail}
              //   onChange={(e) => setSelectedBook(e.target.value)}
              required
            >
              <option value="">Select a book</option>
              {books.map((book) => (
                <option
                  key={book._id}
                  value={book._id}
                  disabled={book.stock === 0}
                >
                  {book.bookName} (
                  {book.stock > 0 ? `${book.stock} available` : "Out of stock"})
                </option>
              ))}
            </select>
          </div>

           {/* Show selected book details */}
          {bookInfo && (
            <div className="book-details">
              <h3>Book Detailed Information</h3>
              <p>Book Name: {bookInfo.bookName}</p>
              <p>ISBN: {bookInfo.isbn}</p>
              <p>Author: {bookInfo.author}</p>
              <p>Category: {bookInfo.category}</p>
              <p>Available Stock: {bookInfo.stock}</p>
            </div>
          )}

          {/* User selection dropdown */}
          <div className="form-group">
            <label>Select User:</label>
            <select
              value={selectedUser}
              onChange={handleUserDetail}
              //onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} - {user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Show selected user details */}
          {userInfo && (
            <div className="user-details">
              <h3>Confirm User  Information</h3>
              <p>User Name: {userInfo.username}</p>
              <p>Email: {userInfo.email}</p>
            </div>
          )}

           {/* Status message display */}
          {message && (
            <div
              className={`message ${
                message.includes("successfully") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <button type="submit">Issue Book</button>
        </form>
      </div>
    </div>
  );
}

export default IssueBook;
