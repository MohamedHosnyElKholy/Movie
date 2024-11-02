import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// مفتاح API
const API_KEY = "02a708bf6e4b7205976338b061b32fc6";

// دالة لجلب البيانات من API
export const fetchAllMovie = createAsyncThunk<
  Array<{ id: number; title: string; poster_path: string }>, // نوع البيانات المرتجعة
  { page: number } // نوع المعاملات التي تأخذها الدالة
>(
  "movies/fetchAllMovie",
  async ({ page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    return response.data.results;
  }
);

const AllMovieSlice = createSlice({
  name: "fetchAllMovie",
  initialState: {
    movieAll: [] as Array<{ id: number; title: string; poster_path: string }>, // تعريف نوع البيانات
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movieAll = [...state.movieAll, ...action.payload]; // تخزين الأفلام الشعبية
      })
      .addCase(fetchAllMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string; // تخزين رسالة الخطأ
      });
  },
});

export default AllMovieSlice.reducer;
