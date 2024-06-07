// movieService.js
const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Function to fetch popular movies
export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Function to fetch top rated movies
export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch top rated movies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Function to fetch upcoming movies
export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Function to fetch movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie by ID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};
export const getCast = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie by ID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

// Function to search movies
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};
