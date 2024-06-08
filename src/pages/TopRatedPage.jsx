import React, { useEffect, useState } from "react"
import Header from "../Components/Header"
import { getTopRatedMovies } from "../services/movieService"
import MovieCard from "../Components/MovieCard"

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(2)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTopRatedMovies(currentPage)
      setMovies(data?.results)
      window.scrollTo({ top: 0, behavior: "smooth" })
      setTotalPages(data?.total_pages)
      console.log(data?.results)
    }
    fetchMovies()
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <Header />
      <MovieCard
        movies={movies}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default TopRated
