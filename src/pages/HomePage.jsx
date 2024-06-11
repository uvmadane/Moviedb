import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import MovieCard from "../Components/MovieCard";
import { fetchPopularMovies } from "../store/moviesSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.popular);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);

  useEffect(() => {
    dispatch(fetchPopularMovies(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch({ type: 'movies/setCurrentPage', payload: 1 });
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch({ type: 'movies/setCurrentPage', payload: page });
    // dispatch(fetchPopularMovies(page));
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

export default HomePage;
