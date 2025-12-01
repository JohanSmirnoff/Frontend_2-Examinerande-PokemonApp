import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import HomePage from "./pages/Home"
import PokeApp from "./pages/PokeApp"


function App() {

  return (
    <Router>
      <nav>
        <Link to="/">
          <button type="button" className="home-button">Home</button>
        </Link>
      </nav>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/PokeApp" element={<PokeApp />} />
      </Routes>
    </Router>
  )
}

export default App
