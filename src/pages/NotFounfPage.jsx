import React from "react"
import { Link } from "react-router-dom"
import Header from "../Components/Header"
import "../styles/pagination.css" // Shares NotFound styles

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <h1>404</h1>
        <p>The cinematic page you are looking for has vanished into the dark or does not exist.</p>
        
        <div className="links-container">
          <span className="link-instruction">Navigate Back to Safety</span>
          <div className="links-row">
            <Link to="/" className="link">Popular</Link>
            <Link to="/toprated" className="link">Top Rated</Link>
            <Link to="/upcoming" className="link">Upcoming</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
