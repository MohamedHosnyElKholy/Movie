import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// مفتاح API
const API_KEY = "02a708bf6e4b7205976338b061b32fc6";

// دالة لجلب البيانات من API
export const fetchAllTv = createAsyncThunk<
  Array<{ id: number; title: string; poster_path: string }>, // نوع البيانات المرتجعة
  { page: number } // نوع المعاملات التي تأخذها الدالة
>("movies/fetchAllTv", async ({ page }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
  );
  return response.data.results;
});

const AllTvSlice = createSlice({
  name: "fetchAllTv",
  initialState: {
    tvAll: [] as Array<{ id: number; title: string; poster_path: string }>, // تعريف نوع البيانات
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTv.fulfilled, (state, action) => {
        state.loading = false;
        state.tvAll = [...state.tvAll, ...action.payload]; // تخزين الأفلام الشعبية
      })
      .addCase(fetchAllTv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string; // تخزين رسالة الخطأ
      });
  },
});

export default AllTvSlice.reducer;
