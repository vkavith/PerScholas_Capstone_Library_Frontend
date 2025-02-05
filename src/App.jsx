// Import routing components

import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// Import page components
import HomePage from "./components/HomePage";
import AddBooks from "./components/AddBooks.jsx";
import EditBooks from "./components/EditBooks.jsx";
import DeleteBooks from "./components/DeleteBooks";
import IssueBooks from "./components/IssueBooks";
import ReturnBooks from "./components/ReturnBooks";
import Collection from "./components/BookCollection";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddBooks />} />
          <Route path="/edit" element={<EditBooks />} />
          <Route path="/delete" element={<DeleteBooks />} />
          {/* Book circulation routes */}
          <Route path="/issue" element={<IssueBooks />} />
          <Route path="/return" element={<ReturnBooks />} />
          {/* Collection view */}
          <Route path="/collection" element={<Collection />} />
          {/* 404 page */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
