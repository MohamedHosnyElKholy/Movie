import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./headerslice";
import popularMoviesSlice from "./pouplerMovie";
import trailerSlice from "./trillerSlice";
import AllMovieSlice from "./allMovie";
import AllTvSlice from "./allTv";
import detialsFilmSlice from "./detialsSlice";
const store = configureStore({
  reducer: {
    moviesSlice,
    popularMoviesSlice,
    trailerSlice,
    AllMovieSlice,
    AllTvSlice,
    detialsFilmSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
