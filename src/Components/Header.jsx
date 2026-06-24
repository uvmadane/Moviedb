import React, { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import "../styles/header.css"

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchClick = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`)
      setIsMenuOpen(false) // Close mobile menu if open
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(e)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bgm-sticky-wrapper">
      <header className="main-header">
        <div className="header-brand">
          <h2>
            <Link to="/" className="brand-logo">
              Movie<span className="brand-highlight">Db</span>
            </Link>
          </h2>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? "open" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                end
              >
                Popular
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/toprated" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Top Rated
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/upcoming" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Upcoming
              </NavLink>
            </li>
            <li className="nav-item search-bar-container">
              <form className="search-bar-form" onSubmit={handleSearchClick}>
                <div className="search-input-wrapper">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                  />
                </div>
                <button type="submit" className="search-button">
                  Search
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
