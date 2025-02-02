import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/add" className="nav-link">Add Book</Link>
      <Link to="/edit" className="nav-link">Edit Book</Link>
      <Link to="/delete" className="nav-link">Delete Book</Link>
      <Link to="/issue" className="nav-link">Issue Book</Link>
      <Link to="/collection" className="nav-link">Collection</Link>
    </div>
  );
}

export default Sidebar;