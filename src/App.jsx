import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
//import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
//import HomePage from "./components/HomePage";
import AddBooks from "./components/AddBooks.jsx";
import EditBooks from "./components/EditBooks.jsx";
import DeleteBooks from "./components/DeleteBooks";
import IssueBooks from "./components/IssueBooks";
import Collection from "./components/BookCollection";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddBooks />} />
          <Route path="/edit" element={<EditBooks />} />
          <Route path="/delete" element={<DeleteBooks />} />
          <Route path="/issue" element={<IssueBooks />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
