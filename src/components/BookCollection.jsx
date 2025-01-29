
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './BookCollection.css';

function Collection() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('http://localhost:5000/api/books');
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="collection">
      <Sidebar />
      <div className="collection-content">
        <h1>Book Collection</h1>
        <div className="books-grid">
          {books.map(book => (
            <div key={book._id} className="book-card">
              <img src={book.imageUrl} alt={book.bookName} />
              <h3>{book.bookName}</h3>
              <p>{book.author}</p>
              <p>Stock: {book.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;