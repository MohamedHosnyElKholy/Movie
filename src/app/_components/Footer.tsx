"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center">
          <h5 className="text-lg font-bold mb-2">About Us</h5>
          <p className="text-sm">
            Welcome to Movify, your ultimate destination for discovering the latest movies and TV series.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-sm hover:text-blue-400">Home</Link>
          <Link href="/movies" className="text-sm hover:text-blue-400">Movies</Link>
          <Link href="/tv" className="text-sm hover:text-blue-400">TV Series</Link>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-xs">© 2024 Movify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
