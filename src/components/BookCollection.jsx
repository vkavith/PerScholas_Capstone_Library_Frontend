import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./BookCollection.css";
import API from "../api/config";

function Collection() {
  // State to manage book collection and search functionality
  const [books, setBooks] = useState([]); // Stores all books
  const [searchBook, setSearchBook] = useState(""); // Stores search input
  const [searchResult, setSearchResult] = useState(null); // Stores search result

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(
        `${API}/api/books`
        //   "https://perscholas-capstone-library-backend.onrender.com/api/books"
      );

      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  // Update search input state
  const handleSearchChange = (e) => {
    setSearchBook(e.target.value);
  };

  // Perform book search
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        //  `http://localhost:5000/api/books/search?q=${searchQuery}`
        // `https://perscholas-capstone-library-backend.onrender.com/api/books/search?q=${searchQuery}`
        `${API}/api/books/search?q=${searchQuery}`
      );
      // const data = await API.get(`/api/books/search?q=${searchQuery}`);
      setSearchResult(res.data);
    } catch (error) {
      console.error("Error searching for book:", error);
      setSearchResult(null);
    }
  };

  // Filter books based on search input
  const filteredBook = books.filter((book) => {
    const matchQuery = book.bookName
      .toLowerCase()
      .includes(searchBook.toLowerCase());

    return matchQuery;
  });

  return (
    <div className="collection">
      <Sidebar />
      <div className="collection-content">
        <h1>Book Collection</h1>

        {/* Search input field with search button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={searchBook}
            onChange={handleSearchChange}
          />
        </div>

        {/* Conditional rendering for search results or book list */}
        {searchResult ? (
          // Display single search result
          <div className="books-grid">
            <h2>Search Result</h2>
            <div className="book-card">
              <img src={searchResult.imageUrl} alt={searchResult.bookName} />
              <h3>{searchResult.bookName}</h3>
              <p className="isbn">ISBN: {searchResult.isbn}</p>
              <p>{searchResult.author}</p>
              <p>Stock: {searchResult.stock}</p>
              <p>Genre: {searchResult.category}</p>
            </div>
          </div>
        ) : (
          // Display filtered book list
          <div className="books-grid">
            {filteredBook.map((book) => (
              <div key={book._id} className="book-card">
                <img src={book.imageUrl} alt={book.bookName} />
                <h3>{book.bookName}</h3>
                <p className="isbn">ISBN: {book.isbn}</p>
                <p>{book.author}</p>
                <p>Stock: {book.stock}</p>
                <p>Genre: {book.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
