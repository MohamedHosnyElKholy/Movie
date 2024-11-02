"use client";

import { detialsFilm } from "@/app/lib/detialsSlice";
import { FaSpinner } from 'react-icons/fa'; // استيراد أيقونة دوارة
import { RootState } from "@/app/lib/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(
    (state: RootState) => state.detialsFilmSlice.detials
  );

  useEffect(() => {
    if (id) {
      dispatch(detialsFilm({ id: Number(id) }));
    }
  }, [dispatch, id]);

  console.log(details);
  
  if (details === null) {
    console.log('null ya m3alm');
    return (
      <div className="text-center">
        <h2 className="text-lg text-red-500">No details available for this film.</h2>
        <p className="text-gray-400">Please check back later for more information.</p>
      </div>
    );
  } else if (!details) {
    return (
      <div className="text-center">
        <FaSpinner className="animate-spin text-blue-500" size={30} /> {/* أيقونة التحميل */}
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // البحث عن أول مقطع فيديو من نوع "Trailer"
  const trailer = details.videos?.results?.find(video => video.site === "YouTube" && video.type === "Trailer");

  return (
    <div className="relative">
      <div
        className="absolute inset-0 min-h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${details.backdrop_path})` }}
      ></div>

      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#F3F3E0] mb-8">
          {details.title}
        </h1>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/3 mb-4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title}
              width={300}
              height={450}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div className="md:w-2/3 md:pl-4">
            <ul className="flex flex-wrap items-center gap-3 mb-7">
              {details.genres?.map((el) => (
                <li
                  key={el.id}
                  className="py-2 px-4 bg-black text-white rounded-full text-sm border-2 border-white"
                >
                  {el.name}
                </li>
              ))}
            </ul>
            <p className="text-gray-300 mb-8">{details.overview}</p>

            <h4 className="text-xl font-medium mb-2 text-[#F3F3E0]">
              Cast
            </h4>
            <ul className="flex flex-wrap items-center gap-3">
              {details.credits.cast.slice(0, 5).map((el) => (
                <li key={el.id} className="mb-1 flex flex-col items-center">
                  {el.profile_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                      alt={el.name}
                      width={90}
                      height={160}
                      className="rounded"
                    />
                  )}
                  <p className="text-sm text-[#F3F3E0] mt-3">{el.name}</p>
                </li>
              ))}
            </ul>

            {/* زر الذهاب إلى يوتيوب */}
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-red-600 text-white py-2 px-4 rounded"
              >
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
