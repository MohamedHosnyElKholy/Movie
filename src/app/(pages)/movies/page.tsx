"use client";
import React, { useEffect, useState } from "react";
import { Label, TextInput, Pagination } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { fetchAllMovie } from "@/app/lib/allMovie";
import Image from "next/image";
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

  const [page, setPage] = useState(() => {
    // استرجاع رقم الصفحة من localStorage
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1; // إذا كان هناك رقم محفوظ، نستخدمه، وإلا نبدأ من 1
  });

  const [searchFilm, setSearchFilm] = useState("");

  useEffect(() => {
    // استعادة موضع التمرير عند تحميل الصفحة
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }

    dispatch(fetchAllMovie({ page }));

    // حفظ موضع التمرير عند مغادرة الصفحة
    return () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
      localStorage.setItem("currentPage", page.toString()); // حفظ رقم الصفحة الحالي
    };
  }, [dispatch, page]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilm(event.target.value);
  };

  const totalPages = useSelector(
    (state: RootState) => state.AllMovieSlice.totalPages
  );

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <h1 className="text-4xl text-white mb-4 text-center">Movie</h1>
        <div className="w-full max-w-md mb-4 mx-auto">
          <Label htmlFor="search" className="block mb-2 text-center">
            ابحث عن فيلم:
          </Label>
          <TextInput
            id="search"
            type="text"
            onChange={handleSearch}
            placeholder="اكتب اسم الفيلم..."
            required
            className="mb-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
          {allMovie
            ?.filter((el) =>
              el.title.toLowerCase().includes(searchFilm.toLowerCase())
            )
            .map((movie) => (
              <Link
                href={`/detials/${movie.id}`}
                key={movie.id}
                className="bg-gray-800 p-4 rounded-lg flex flex-col items-center"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={300}
                  className="mb-2 rounded"
                />
                <h2 className="text-xl text-white text-center mb-2">
                  {movie.title}
                </h2>
              </Link>
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
}
