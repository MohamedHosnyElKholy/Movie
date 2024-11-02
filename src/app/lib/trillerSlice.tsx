// trailerSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// مفتاح API
const API_KEY = "02a708bf6e4b7205976338b061b32fc6";

// دالة لجلب التريلرز من API
export const fetchTrailer = createAsyncThunk(
  "movies/fetchTrailer",
  async ({ id }: { id: number }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );
    return response.data; // إرجاع النتائج فقط
  }
);

const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    trailers: [] as Array<{ id: string; key: string; name: string }>,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.loading = false;
        state.trailers = action.payload.results; // تخزين النتائج
      })
      .addCase(fetchTrailer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string; // تخزين رسالة الخطأ
      });
  },
});

export default trailerSlice.reducer;
