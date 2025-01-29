
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './BookCollection.css';

function Collection() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('http://localhost:5000/api/books');
      setBooks(data);
    };
    fetchBooks();
  }, []);


  const handleSearchChange = (e) => {
    setSearchBook(e.target.value);
  };

  const filteredBook = books.filter((book) => {
    const matchesQuery = book.bookName.toLowerCase().includes(searchBook.toLowerCase());
    
    return matchesQuery;
  });

  return (
    <div className="collection">
      <Sidebar />
      <div className="collection-content">
        <h1>Book Collection</h1>
         <div className= "search-container">
         <input
            type="text"
            placeholder="Search books..."
            value={searchBook}
            onChange={handleSearchChange}
          />
         </div>
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