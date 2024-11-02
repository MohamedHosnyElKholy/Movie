import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء دالة لجلب البيانات من API
const API_KEY = "02a708bf6e4b7205976338b061b32fc6";
export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    return response.data.results.slice(0, 3); // جلب أول 3 أفلام
  }
);

export const fetchAllTrendingMovies = createAsyncThunk(
  "movies/fetchAllTrendingMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    return response.data.results; // جلب جميع الأفلام المتداولة
  }
);

export const fetchAllTrendingTv = createAsyncThunk(
  "movies/fetchAllTrendingTv",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${API_KEY}`
    );
    return response.data.results; // جلب جميع الأفلام المتداولة
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    all: [],
    tv: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload; // تخزين أول 3 أفلام
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchAllTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload; // تخزين جميع الأفلام المتداولة في all
      })
      .addCase(fetchAllTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchAllTrendingTv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTrendingTv.fulfilled, (state, action) => {
        state.loading = false;
        state.tv = action.payload; // تخزين جميع الأفلام المتداولة في all
      })
      .addCase(fetchAllTrendingTv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default moviesSlice.reducer;
