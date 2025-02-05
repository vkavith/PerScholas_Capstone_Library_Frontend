// Sidebar navigation component with routing
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Navigation links for different book management pages */}
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/add" className="nav-link">Add Book</Link>
      <Link to="/edit" className="nav-link">Edit Book</Link>
      <Link to="/delete" className="nav-link">Delete Book</Link>

      {/* Book circulation links */}
      <Link to="/issue" className="nav-link">Issue Book</Link>
      <Link to="/return" className="nav-link">Return Book</Link>
      
      {/* View all books */}
      <Link to="/collection" className="nav-link">Collection</Link>
    </div>
  );
}

export default Sidebar;