"use client";

import React, { useState } from "react";
import LinkBtn from "@/components/button/LinkButton";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import Avatar from "@/components/navbar/navElements/avatar";
import UserDropdown from "@/components/navbar/navElements/userDropdown";

import SearchBar from "../Search/Search";

const Navbar = () => {
  const { user } = useUserContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 items-center bg-base-100 border-b px-4 py-2 sm:py-2 md:py-4 sm:px-8 md:px-12 mb-8 gap-y-2 gap-x-4">
      {/* Search Bar */}
      <label className="w-full max-md:col-span-2 h-fit md:w-auto flex flex-col text-md gap-2 md:mr-auto md:row-start-1">
        <SearchBar />
      </label>

      <div
        className={
          "flex justify-between md:grid grid-cols-2 cols-start-2 col-span-2 cols-end-4 h-10 max-md:row-start-1"
        }
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-start md:w-full md:text-center cursor-pointer text-2xl sm:text-3xl md:text-4xl font-bold max-sm:mt-1"
        >
          PunchStarter
        </Link>

        {/*Novy projekt & Avatar*/}
        <div className="flex items-strech gap-2 sm:gap-4 w-full justify-end">
          <LinkBtn
            variant={"outlined"}
            text={"Nový projekt"}
            href={"/new-project"}
            isDisabled={!user}
          />
          {!user ? (
            <LinkBtn text={"Přihlásit se"} href={"/login"} />
          ) : (
            <div className={"relative w-min self-end items-end"}>
              <div
                onClick={() => {
                  setDropdownOpen((prevState) => !prevState);
                }}
              >
                <Avatar />
              </div>
              <UserDropdown setOpen={setDropdownOpen} isOpen={dropdownOpen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
