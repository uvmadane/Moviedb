import React, { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import "../styles/header.css"

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`)
    }
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="bgm">
      <header>
        <h2>
          <Link to="/">MovieDb</Link>
        </h2>
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <>&times;</> : <>&#9776;</>}
        </div>
        <nav className={isMenuOpen ? "open" : ""}>
          <ul>
            <li>
              <Link to="/">Popular</Link>
            </li>
            <li>
              <Link to="/toprated">Top Rated</Link>
            </li>
            <li>
              <Link to="/upcoming">Upcoming</Link>
            </li>
            <li className="search-bar">
              <input
                type="text"
                placeholder="Search by Movie Name"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button onClick={handleSearchClick}>Search</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
