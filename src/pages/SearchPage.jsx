import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useLocation } from 'react-router-dom';
import { searchMovies,  } from "../services/movieService"
import MovieCard from '../Components/MovieCard';


const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(2)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
          const fetchSearchResults = async () => {
            try {
              const data = await searchMovies(query,currentPage);
              setSearchResults(data.results);
              window.scrollTo({ top: 0, behavior: "smooth" })
              setTotalPages(data?.total_pages)
            } catch (error) {
              console.error('Error fetching search results:', error);
            }
          };
    
          fetchSearchResults();
        }
      }, [location.search,currentPage]);

      const handlePageChange = (page) => {
        setCurrentPage(page)
      }
  return (
    <>
    <Header/>
    <MovieCard
        movies={searchResults}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default SearchPage
