import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
 // const [books, setBooks] = useState([]);

 // useEffect(() => {
 //   const fetchBooks = async () => {
 //     const { data } = await axios.get("http://localhost:5000/api/books");
 //     setBooks(data);
 //   };
  //  fetchBooks();
 // }, []);

  return (
    <div className="home">
      <div className="left-panel">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/add" className="nav-link">Add Book</Link>
        <Link to="/edit" className="nav-link">Edit Book</Link>
        <Link to="/delete" className="nav-link">Delete Book</Link>
        <Link to="/collection" className="nav-link">Collection</Link>
      </div>

      <div className="main-content">
        <h1>Library Management System</h1>
        <p className="subtitle">Your digital gateway to knowledge</p>

      {/*  <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.imageUrl} alt={book.bookName} />
              <h3>{book.bookName}</h3>
              <p>{book.author}</p>
              <p>Stock: {book.stock}</p>
          </div> 
          ))} */}
        </div>
      </div>
    
  );
}

export default HomePage;
