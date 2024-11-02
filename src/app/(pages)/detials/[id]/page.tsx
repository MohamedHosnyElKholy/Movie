"use client";

import { detialsFilm } from "@/app/lib/detialsSlice";
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

  // تأكد من أن details موجود قبل محاولة الوصول إلى خصائصه
  if (!details) {
    return <div className="text-center">Loading...</div>; // يمكنك وضع عنصر تحميل هنا
  }

  return (
    <div className="relative">
      {/* صورة الخلفية */}
      <div
        className="absolute inset-0 min-h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${details.backdrop_path})` }}
      ></div>

      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-[64px] font-bold text-center text-[#F3F3E0] mb-[32px]">
          {details.title}
        </h1>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/3 mb-4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title}
              width={300}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-4">
            <ul className="flex items-center gap-3 mb-7">
              {details.genres?.map((el) => (
                <li
                  key={el.id}
                  className="py-[8px] px-[24px] bg-black text-white rounded-[50px] text-[12px] border-[2px solid #fff]"
                >
                  {el.name}
                </li>
              ))}
            </ul>
            <p className="text-gray-300 mb-[32px]">{details.overview}</p>

            <h4 className="text-[24px] font-medium mb-2 text-[#F3F3E0]">
              Cast
            </h4>
            <ul className="flex items-center gap-3">
              {details.credits.cast.slice(0, 5).map((el) => (
                <li key={el.id} className="mb-1 flex flex-col items-center">
                  {el.profile_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                      alt={el.name}
                      width={90}
                      height={160}
                    />
                  )}
                  <p className="text-[12px] text-[#F3F3E0] mt-3">{el.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
