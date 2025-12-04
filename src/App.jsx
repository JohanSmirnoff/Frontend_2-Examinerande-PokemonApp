import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from "./pages/HomePage"
import PokeApp from "./pages/PokeAppPage"

function App() {

  return (
    <Router>
      <nav id="nav-bar">
        <div className="nav-container">
          <Link to="/">
            <img src="../public/pokeball2.svg" alt="pokeball-icon" id="pokeball-icon"/>
          </Link>
        </div>
      </nav>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PokeAppPage" element={<PokeApp />} />
      </Routes>
    </Router>
  )
}

export default App