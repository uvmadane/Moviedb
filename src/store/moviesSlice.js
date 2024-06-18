import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getMovieById, getCast, searchMovies } from '../services/movieService';

export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', async (currentPage) => {
  const response = await getPopularMovies(currentPage);
  return response;
});

export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies', async (currentPage) => {
  const response = await getTopRatedMovies(currentPage);
  return response;
});

export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', async (currentPage) => {
  const response = await getUpcomingMovies(currentPage);
  return response;
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id) => {
  const response = await getMovieById(id);
  const castResponse = await getCast(id);
  return { movie: response, cast: castResponse.cast };
});

export const fetchSearchMovies = createAsyncThunk('movies/fetchSearchMovies', async ({ query, currentPage }) => {
  const response = await searchMovies(query, currentPage);
  return response;
});

const initialState = {
  popular: [],
  topRated: [],
  upcoming: [],
  searchResults: [],
  movieDetail: null,
  cast: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieDetail = action.payload.movie;
        state.cast = action.payload.cast;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addMatcher(
        (action) => action.type.startsWith('movies/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('movies/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('movies/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { setCurrentPage } = moviesSlice.actions;

export default moviesSlice.reducer;
