import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import {getPopularMovies} from '../services/movieService'
import MovieCard from '../Components/MovieCard';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(10); 

    useEffect(() => {
        const fetchMovies = async () => {
          const data = await getPopularMovies();
          setMovies(data?.results);
          console.log(data?.results);
        };
        fetchMovies();
      }, []);

  return (
    <div>
    <Header/>
    <MovieCard movies={movies} />

      
    </div>
  )
}

export default HomePage
