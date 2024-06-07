import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your async thunks for fetching movie data here

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    topRated: [],
    upcoming: [],
    searched: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Define your synchronous actions here
  },
  extraReducers: (builder) => {
    // Handle async actions
  },
});

export default movieSlice.reducer;
