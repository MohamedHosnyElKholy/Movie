"use client";
import React, { useEffect, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { fetchAllMovie } from "@/app/lib/allMovie";
import Image from "next/image"; // استيراد مكون Image
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export default function Page() {
  const dispatch = useDispatch();
  const allMovie = useSelector(
    (state: RootState) => state.AllMovieSlice.movieAll
  ) as Movie[];

  const [page, setPage] = useState(1);
  const [searchFilm, setsearchFilm] = useState("");
  useEffect(() => {
    dispatch(fetchAllMovie({ page }));
  }, [dispatch, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearchFilm(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <h1 className="text-4xl text-white mb-4 text-center">Movie</h1>
        <div className="w-full max-w-md mb-4 mx-auto">
          <Label htmlFor="search" className="block mb-2 text-center">
            Search for a movie:
          </Label>
          <TextInput
            id="search"
            type="text"
            onChange={handleSearch}
            placeholder="Type movie name..."
            required
            className="mb-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
          {
            allMovie?.filter((el)=> 
              el.title.toLowerCase().includes(searchFilm.toLowerCase())
            ).map((movie) => (
            <Link href={`/detials/${movie.id}`}
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg flex flex-col items-center"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500} // تحديد العرض المناسب
                height={300} // تحديد الطول المناسب
                className="mb-2 rounded"
              />
              <h2 className="text-xl text-white text-center mb-2">
                {movie.title}
              </h2>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore} className="bg-blue-600 text-white my-3">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
