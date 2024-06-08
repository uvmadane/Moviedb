import React from "react"
import "../styles/header.css"
import { BASE_URL } from "../config"
import { Link } from "react-router-dom"
import Pagination from "./Pagination"

const MovieCard = ({ movies, currentPage, totalPages, onPageChange }) => {
  const renderMovies = movies?.map((movie, index) => (
    <div key={index} className="movie-cards curser">
      <Link to={`/movieDetails/${movie.id}`}>
        <img src={` ${BASE_URL}${movie.poster_path}`} alt={movie.title} />
        <div className="movie-information">
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
        </div>
      </Link>
    </div>
  ))

  return (
    <>
      <div className="movies-container">{renderMovies}</div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default MovieCard
