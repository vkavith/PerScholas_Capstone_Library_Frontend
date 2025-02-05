import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
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
 
// HomePage content
 return (
    <div className="home">
      <Sidebar />
      <div className="main-content">
        <h1>Library Management System</h1>
        <p className="subtitle">Your digital gateway to knowledge</p>
      </div>
    </div>
  );
      {/*  <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.imageUrl} alt={book.bookName} />
              <h3>{book.bookName}</h3>
              <p>{book.author}</p>
              <p>Stock: {book.stock}</p>
          </div> 
          ))} */}
      
}

export default HomePage;
