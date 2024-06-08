import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import MovieCard from "../Components/MovieCard";
import { fetchTopRatedMovies } from "../store/moviesSlice";

const TopRated = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.topRated);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);
 
 
  useEffect(() => {
    dispatch({ type: 'movies/setCurrentPage', payload: 1 });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTopRatedMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch({ type: 'movies/setCurrentPage', payload: page });
    dispatch(fetchTopRatedMovies(page));
  };

  return (
    <div>
      <Header />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <MovieCard
          movies={movies}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TopRated;
