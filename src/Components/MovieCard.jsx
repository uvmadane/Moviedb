import React from "react"
import "../styles/header.css"
import { BASE_URL } from "../config"
import { Link } from "react-router-dom"
import Pagination from "./Pagination"

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="gold-star-svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const FilmIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fallback-film-icon">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
)

const MovieCard = ({ movies, currentPage, totalPages, onPageChange }) => {
  const renderMovies = movies?.map((movie, index) => {
    const hasPoster = movie.poster_path && movie.poster_path.trim() !== "null"
    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A"
    const ratingValue = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"

    return (
      <div key={movie.id || index} className="movie-cards curser">
        <Link to={`/movieDetails/${movie.id}`}>
          <div className="card-image-wrapper">
            <div className="card-rating-badge">
              <StarIcon />
              <span>{ratingValue}</span>
            </div>
            {hasPoster ? (
              <img 
                src={`${BASE_URL}${movie.poster_path.trim()}`} 
                alt={movie.title} 
                loading="lazy"
              />
            ) : (
              <div className="movie-poster-fallback">
                <FilmIcon />
                <span>{movie.title}</span>
              </div>
            )}
          </div>
          <div className="movie-information">
            <h3>{movie.title}</h3>
            <div className="movie-card-footer">
              <span className="movie-year">{releaseYear}</span>
              <span className="movie-details-link">Details →</span>
            </div>
          </div>
        </Link>
      </div>
    )
  })

  return (
    <>
      <div className="movies-container">
        {renderMovies && renderMovies.length > 0 ? (
          renderMovies
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)", fontFamily: "var(--font-display)" }}>
            <h3>No movies found. Try searching for something else.</h3>
          </div>
        )}
      </div>
      {renderMovies && renderMovies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  )
}

export default MovieCard
