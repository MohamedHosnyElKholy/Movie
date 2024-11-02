import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// مفتاح API
const API_KEY = "02a708bf6e4b7205976338b061b32fc6";

// دالة لجلب تفاصيل الفيلم من API
export const detialsFilm = createAsyncThunk<
  {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
  }, // نوع البيانات المرتجعة
  { id: number } // نوع المعاملات التي تأخذها الدالة
>("movies/detialsFilm", async ({ id }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  return response.data; // إرجاع البيانات الكاملة
});

const detialsFilmSlice = createSlice({
  name: "detialsFilm",
  initialState: {
    detials: null as {
      id: number;
      title: string;
      poster_path: string;
      overview: string;
      release_date: string;
    } | null, // هنا نحدد النوع
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detialsFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detialsFilm.fulfilled, (state, action) => {
        state.loading = false;
        state.detials = action.payload; // تخزين تفاصيل الفيلم
      })
      .addCase(detialsFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string; // تخزين رسالة الخطأ
      });
  },
});

export default detialsFilmSlice.reducer;
