const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

const checkBlockAPI = () => {
  if (window.isDevToolsOpen) {
    throw new Error('API access blocked: Developer Tools are open.');
  }
  const start = performance.now();
  debugger;
  if (performance.now() - start > 100) {
    window.isDevToolsOpen = true;
    throw new Error('API access blocked: Developer Tools are open.');
  }
};

export const getPopularMovies = async (currentPage) => {
  try {
    checkBlockAPI();
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`);
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

export const getTopRatedMovies = async (currentPage) => {
  try {
    checkBlockAPI();
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`);
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

export const getUpcomingMovies = async (currentPage) => {
  try {
    checkBlockAPI();
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`);
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

export const getMovieById = async (id) => {
  try {
    checkBlockAPI();
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
    checkBlockAPI();
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

export const searchMovies = async (query, currentPage) => {
  try {
    checkBlockAPI();
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${currentPage}`);
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

export const getPersonDetails = async (id) => {
  try {
    checkBlockAPI();
    const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Failed to fetch person details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching person details:', error);
    throw error;
  }
};
