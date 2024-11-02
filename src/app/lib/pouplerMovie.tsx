import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// مفتاح API
const API_KEY = "02a708bf6e4b7205976338b061b32fc6";

// دالة لجلب البيانات من API
export const fetchpopular  = createAsyncThunk(
  "movies/fetchpopular",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
    );
    return response.data.results; // إرجاع النتائج فقط
  }
);

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState: {
    popular: [] as Array<{ id: number; title: string; poster_path: string }>, // تعريف نوع البيانات
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchpopular.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchpopular.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload; // تخزين الأفلام الشعبية
      })
      .addCase(fetchpopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string; // تخزين رسالة الخطأ
      });
  },
});

export default popularMoviesSlice.reducer;
