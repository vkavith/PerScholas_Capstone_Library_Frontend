import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
//import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
//import HomePage from "./components/HomePage";
//import AddBooks from "./components/AddBooks";
import Collection from "./components/BookCollection";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/add" element={<AddBooks />} />
          <Route path="/edit" element={<EditBook />} />
  <Route path="/delete" element={<DeleteBook />} /> */}
          <Route path="/collection" element={<Collection />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
