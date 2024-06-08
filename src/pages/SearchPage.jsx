import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../Components/Header"
import { useLocation } from "react-router-dom"
import { fetchSearchMovies } from "../store/moviesSlice"
import MovieCard from "../Components/MovieCard"

const SearchPage = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector((state) => state.movies.searchResults)
  const status = useSelector((state) => state.movies.status)
  const error = useSelector((state) => state.movies.error)
  const location = useLocation()
  const totalPages = useSelector((state) => state.movies.totalPages)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query")
    if (query) {
      dispatch(fetchSearchMovies({ query, currentPage }))
    }
  }, [dispatch, location.search, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <MovieCard
          movies={searchResults}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default SearchPage
