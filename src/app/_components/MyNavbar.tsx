"use client";
import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

export default function MyNavbar() {
  const pathname = usePathname();

  return (
    <Navbar className="container bg-transparent mx-auto">
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-[40px] text-[#F3F3E0] mr-3">
          Movify
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          className={`text-[24px] text-[#F3F3E0] ${pathname === "/" ? 'active' : ''}`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/movies"
          className={`text-[24px] text-[#F3F3E0] ${pathname === "/movies" ? 'active' : ''}`}
        >
          Movies
        </Navbar.Link>
        <Navbar.Link
          href="/tv"
          className={`text-[24px] text-[#F3F3E0] ${pathname === "/tv" ? 'active' : ''}`}
        >
          TV Series
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
