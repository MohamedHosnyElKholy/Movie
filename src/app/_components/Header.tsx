"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { fetchTrendingMovies } from "../lib/headerslice";
import { fetchTrailer } from "../lib/trillerSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  original_title: string;
  backdrop_path: string;
  overview: string;
}

export default function Header() {
  const dispatch = useDispatch();
  const trending = useSelector(
    (state: RootState) => state.moviesSlice.trending
  ) as Movie[];
  const trailer = useSelector(
    (state: RootState) => state.trailerSlice.trailers
  ) as { key: string }[];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const openTrailer = (id: number) => {
    console.log(`Opening trailer for movie ID: ${id}`);
    if (id) {
      dispatch(fetchTrailer({ id }));
      setShowTrailer(true);
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="h-screen">
      <Slider {...settings}>
        {Array.isArray(trending) && trending.length > 0
          ? trending.map((movie, index) => (
              <div key={movie.id} className="relative h-screen">
                <Image
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center p-4 bg-black bg-opacity-50">
                  <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-6 text-white">
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{
                            opacity: currentSlide === index ? 1 : 0,
                            y: currentSlide === index ? 0 : -20,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                              opacity: currentSlide === index ? 1 : 0,
                              y: currentSlide === index ? 0 : -20,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-[40px] md:text-[80px] text-[#F3F3E0]"
                          >
                            {movie.original_title}
                          </motion.h1>
                          <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                              opacity: currentSlide === index ? 1 : 0,
                              y: currentSlide === index ? 0 : -20,
                            }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-4 text-[#F3F3E0] text-[14px] md:text-[16px]"
                          >
                            {movie.overview}
                          </motion.p>
                        </motion.div>
                        <div className="flex flex-col md:flex-row gap-3 mt-6 items-center">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: currentSlide === index ? 1 : 0,
                              y: currentSlide === index ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <Link
                              className="text-[20px] md:text-[24px] rounded-[50px] text-[#fff]
    py-[8px] px-[28px] bg-[#4cceFE] shadow-[0_0_7px_8px_#0077a6] transition duration-300 ease-in-out hover:shadow-[0_0_7px_15px_#0077a6]"
                              href={`/detials/${movie.id}`}
                            >
                              Watch Now
                            </Link>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: currentSlide === index ? 1 : 0,
                              y: currentSlide === index ? 0 : 20,
                            }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <Button
                              className="border-[3px solid red] bg-transparent rounded-[50px] py-[8px] px-[28px]"
                              onClick={() => openTrailer(movie.id)}
                            >
                              Watch Trailer
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6 text-white flex justify-center items-center">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                          alt={movie.title}
                          width={400}
                          height={600}
                          className="object-cover h-auto max-h-full rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Slider>

      {/* مشغل الفيديو */}

      {showTrailer && trailer.length > 0 ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute top-0 right-0 p-4 text-white"
              onClick={closeTrailer}
            >
              X
            </button>
            <iframe
              className="w-full h-[500px]"
              src={`https://www.youtube.com/embed/${trailer[0]?.key}`} // استخدام ? للتحقق
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
