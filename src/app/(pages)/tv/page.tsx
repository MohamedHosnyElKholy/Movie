"use client";
import React, { useEffect, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import Image from "next/image";
import { fetchAllTv } from "@/app/lib/allTv"; // تأكد من أن لديك دالة fetchAllTv في هذا المسار
import Link from "next/link";

interface TVShow {
  id: number;
  name: string; // استخدام "name" بدلاً من "title" للعروض التلفزيونية
  poster_path: string;
  overview: string;
  first_air_date: string; // تاريخ العرض الأول
}

export default function Page() {
  const dispatch = useDispatch();
  const allTv = useSelector(
    (state: RootState) => state.AllTvSlice.tvAll
  ) as TVShow[];

  const [page, setPage] = useState(1);
  const [searchFilm, setSearchFilm] = useState("");

  useEffect(() => {
    dispatch(fetchAllTv({ page }));
  }, [dispatch, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilm(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <h1 className="text-4xl text-white mb-4 text-center">TV Shows</h1>
        <div className="w-full max-w-md mb-4 mx-auto">
          <Label htmlFor="search" className="block mb-2 text-center">
            Search for a TV show:
          </Label>
          <TextInput
            id="search"
            type="text"
            onChange={handleSearch}
            placeholder="Type TV show name..."
            required
            className="mb-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
          {allTv
            ?.filter((el) =>
              el.name.toLowerCase().includes(searchFilm.toLowerCase())
            )
            .reduce((unique, tvShow) => {
              // تحقق مما إذا كان التلفاز موجودًا بالفعل في القائمة الفريدة
              if (!unique.some((item) => item.id === tvShow.id)) {
                unique.push(tvShow);
              }
              return unique;
            }, [])
            .map((tvShow) => (
              <Link
                href={`/detials/${tvShow.id}`}
                key={tvShow.id}
                className="bg-gray-800 p-4 rounded-lg flex flex-col items-center"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt={tvShow.name}
                  width={500}
                  height={300}
                  className="mb-2 rounded"
                />
                <h2 className="text-xl text-white text-center mb-2">
                  {tvShow.name}
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
