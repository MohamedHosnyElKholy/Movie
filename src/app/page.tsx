import React from "react";
import Header from "./_components/Header";
import Trending from "./_components/Trending";
import TrendingTv from "./_components/TrendingTv";
import PopularMovies from "./_components/PopularMovies";

export default function page() {
  return (
    <>
      <Header />
      <Trending />
      <TrendingTv />
      <PopularMovies />
    </>
  );
}
