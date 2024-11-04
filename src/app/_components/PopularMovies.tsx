"use client";
import Link from "next/link";
import Slider from "react-slick";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import Image from "next/image"; // استيراد مكون Image من Next.js
import { fetchpopular } from "../lib/pouplerMovie";

// تعريف واجهة الفيلم
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Trending() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // عرض 2 في الشاشات الصغيرة
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // عرض 3 في الشاشات المتوسطة
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // عرض 2 في الشاشات الصغيرة
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // عرض 1 في الشاشات الصغيرة جدًا
        },
      },
    ],
  };

  const dispatch = useDispatch();
  const trending = useSelector(
    (state: RootState) => state.popularMoviesSlice.popular
  ) as Movie[];

  useEffect(() => {
    dispatch(fetchpopular());
  }, [dispatch]);
  console.log(trending);
  return (
    <div className="container mt-[50px] mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[24px] text-[#F3F3E0]">Popular Movie</h2>
        <Link
          href="/tv"
          className="border-[3px solid #fff] bg-transparent rounded-[50px] py-[6px] px-[24px] text-[#fff] transition duration-300 ease-in-out hover:bg-[#4cceFE] hover:text-[#000]"
        >
          View More
        </Link>
      </div>
      <Slider {...settings}>
        {trending?.map((movie) => (
          <Link
            href={`/detials/${movie.id}`}
            key={movie.id}
            className="relative p-2"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="error"
              layout="responsive" // تحسين التحميل
              width={500} // عرض الصورة
              height={750} // ارتفاع الصورة
              className="rounded"
            />
            <div className="mt-2">
              <h3 className="text-[18px] text-[#F3F3E0] text-center">
                {movie.title}
              </h3>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
