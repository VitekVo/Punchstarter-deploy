"use client";

import React from "react";
import LinkButton from "@/components/button/LinkButton";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import Avatar from "@/components/navbar/navElements/avatar";
import Button from "@/components/button/Button";
import LinkBtn from "@/components/button/LinkButton";
import SearchBar from "../Search/Search";
const Navbar = () => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-wrap items-center bg-base-100 border-b px-4 sm:px-8 py-4 mb-8">
      {/* Search Bar */}
      <label className="w-full sm:w-auto flex flex-col text-sm gap-2 mb-4 sm:mb-0 sm:mr-auto">
        <SearchBar />
      </label>

      {/* Logo */}
      <Link
        href="/"
        className="w-full sm:w-auto text-center btn btn-ghost text-2xl sm:text-4xl font-bold mb-4 sm:mb-0 sm:mr-auto"
      >
        PunchStarter
      </Link>

      {/* Buttons */}
      <div className="flex w-full sm:w-auto justify-center sm:justify-end items-center gap-4">
        <LinkBtn variant="outlined" text="Nový projekt" href="/createProject" />
        {!user ? (
          <LinkButton text="Přihlásit se" href="/login" />
        ) : (
          <Avatar username={user.username} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
