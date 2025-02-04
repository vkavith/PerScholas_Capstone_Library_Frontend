import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import API from "../api/config";
import "./ReturnBooks.css";

function ReturnBooks() {
  const [users, setUsers] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/api/users`);
        setUsers(response.data);
      } catch (error) {
        setMessage("Error loading users");
      }
    };
    fetchUsers();
  }, []);

  const handleUserInfo = async (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    setSelectedTransaction("");
    setBookInfo();

    if (userId) {
      //Set user info

      const selectedUserDesc = users.find((user) => user._id === userId);
      setUserInfo(selectedUserDesc);

      //Fetch all issued books for this user
      try {
        const response = await axios.get(`${API}/api/issuetransactions`, {
          params: { user: userId, status: "issued" },
        });
        setIssuedBooks(response.data);
      } catch (error) {
        setMessage("Error loading user books");
      }
    } else {
      setUserInfo(null);
      setIssuedBooks([]);
    }
  };

  const handleTransactionInfo = async (e) => {
    const transactionId = e.target.value;

    setSelectedTransaction(transactionId);

    if (transactionId) {
      const transaction = issuedBooks.find((t) => t._id === transactionId);

      if (transaction) {
        setBookInfo({
          bookName: transaction.book.bookName,
          isbn: transaction.book.isbn,
          author: transaction.book.author,
          category: transaction.book.category,
          issueDate: new Date(transaction.issueDate).toLocaleDateString(),
          dueDate: new Date(transaction.dueDate).toLocaleDateString(),
        });
      }
    } else {
      setBookInfo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedTransaction || !returnDate) {
      setMessage("Please select a book and enter return date");
      return;
    }

    try {
      const response = await axios.post(`${API}/api/returntransactions`, {
        transactionId: selectedTransaction,
        returnDate: returnDate,
      });

      if (response.data) {
        setMessage("Book returned successfully!");
        setSelectedTransaction("");
        setReturnDate("");
        setBookInfo(null);

        // Refresh issued books list
        if (selectedUser) {
          const booksResponse = await axios.get(
            `${API}/api/issuetransactions`,
            {
              params: { user: selectedUser, status: "issued" },
            }
          );
          setIssuedBooks(booksResponse.data);
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error returning book");
      }
    }
  };


return (
    <div className="return-book-page">
      <Sidebar />
      <div className="return-content">
        <h1>Return Book</h1>

        <form onSubmit={handleSubmit} className="return-form">
          <div className="form-group">
            <label>Select User:</label>
            <select
              value={selectedUser}
              onChange={handleUserInfo}
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

          {userInfo && (
            <div className="user-details">
              <h3>User Information</h3>
              <p>User Name: {userInfo.username}</p>
              <p>Email: {userInfo.email}</p>
            </div>
          )}

          {issuedBooks.length > 0 && (
            <div className="form-group">
              <label>Select Book to Return:</label>
              <select
                value={selectedTransaction}
                onChange={handleTransactionInfo}
                required
              >
                <option value="">Select a book</option>
                {issuedBooks.map((transaction) => (
                  <option key={transaction._id} value={transaction._id}>
                    {transaction.book.bookName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {bookInfo && (
            <div className="book-details">
              <h3>Book Information</h3>
              <p>Book Name: {bookInfo.bookName}</p>
              <p>ISBN: {bookInfo.isbn}</p>
              <p>Author: {bookInfo.author}</p>
              <p>Category: {bookInfo.category}</p>
              <p>Issue Date: {bookInfo.issueDate}</p>
              <p>Due Date: {bookInfo.dueDate}</p>
            </div>
          )}

          {selectedTransaction && (
            <div className="form-group">
              <label>Return Date:</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
          )}

          {message && (
            <div
              className={`message ${
                message.includes("successfully") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <button type="submit" disabled={!selectedTransaction || !returnDate}>
            Return Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReturnBooks;