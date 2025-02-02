import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import API from "../api/config";
import "./IssueBooks.css";

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  // Fetch books and users on component mount
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

      if (response.data) {
        setMessage("Book issued successfully!");
        setSelectedBook("");
        setSelectedUser("");

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

        <form onSubmit={handleSubmit} className="issue-form">
          <div className="form-group">
            <label>Select Book:</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
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

          <div className="form-group">
            <label>Select User:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
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
