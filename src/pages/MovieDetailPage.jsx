import React, { useEffect, useState } from "react"
import "../styles/movieDetails.css"
import Header from "../Components/Header"
import { getMovieById, getCast } from "../services/movieService"
import { BASE_URL } from "../config"
import { useParams } from 'react-router-dom'


const MovieDetailPage = () => {
    const {id} =useParams();

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = await getMovieById(id)
      setMovie(movieData)

      if (movieData.id) {
        const castData = await getCast(movieData.id)
        setCast(castData.cast)
      }
    }

    fetchMovieData()
  }, [id])

  const renderMovieDetails = (movie, cast) => (
    <div className="topmain">

    <div className="movie-card1">
      <div className="movie-details">
        <div className="movie-card1 smallimg">
          <img
            src={`${BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="poster-image"
          />
          <div  className="content">
            <h2>{movie.title}</h2>
            <h3 className="rating">Rating: {movie.vote_average.toFixed(1)}</h3>
            <p className="time"><span>{movie.runtime} min</span> {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p> </p>
            <p>Release Date: {new Date(movie.release_date).toDateString()}</p>
          </div>
        </div>
        <div className="overview">
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>
      </div>
      <img
        src={`${BASE_URL}${movie.backdrop_path}`}
        alt={movie.title}
        className="backdrop-image"
      />
    </div>
    </div>
  )
    const renderCast = cast?.map((member, index) => (
      <div key={index} className="cast-cards">
        <img src={`${BASE_URL}${member.profile_path}`} alt={member.name} />
        <div className="cast-information">
          <h3>{member.name}</h3>
          <p>as {member.character}</p>
        </div>
      </div>
    ));

  return (
    <>
      <Header />
      <div className="maind">
        <div className="movie-container">
          {movie ? renderMovieDetails(movie, cast) : <p>Loading...</p>}
        </div>
        <h2 className="cast">Cast</h2>
        <div className="cast-container">{renderCast}</div>
      </div>
    </>
  )
}

export default MovieDetailPage
