import React, { useState, useEffect } from 'react';
import './home.css';
import { BASE_URL } from '../../config';
import { Link } from "react-router-dom"


const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('Popular');
  const moviesPerPage = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.results);
        setTotal(data.total_pages)
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log(data)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    // Logic to filter movies based on category
  };
  

  const renderMovies = movies?.map((movie, index) => (
    <div key={index} className="movie-card">
      {/* <Link to={`/product/${props.id}`}> */}

      <img src={` ${BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Rating: {movie.popularity.toFixed(1)}</p>
      </div>
      {/* </Link> */}

    </div>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bgm">
      <header>
        <h1>MovieDb</h1>
        <nav>
          <ul>
            <li className={currentCategory === 'Popular' ? 'active' : ''} onClick={() => handleCategoryChange('Popular')}>Popular</li>
            <li className={currentCategory === 'Top Rated' ? 'active' : ''} onClick={() => handleCategoryChange('Top Rated')}>Top Rated</li>
            <li className={currentCategory === 'Upcoming' ? 'active' : ''} onClick={() => handleCategoryChange('Upcoming')}>Upcoming</li>
            <li className="search-bar">
              <input
                type="text"
                placeholder="Search by Movie Name"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button onClick={() => console.log('Search clicked')}>Search</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="movies-container">
        {renderMovies}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Movie;
