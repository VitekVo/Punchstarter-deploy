"use client";

import React from "react";
import LinkButton from "@/components/button/LinkButton";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import Avatar from "@/components/navbar/navElements/avatar";
import Button from "@/components/button/Button";
import LinkBtn from "@/components/button/LinkButton";
import UserDropdown from "@/components/navbar/navElements/userDropdown";

const Navbar = () => {
  const { user } = useUserContext();

  return (
    <div className="flex justify-between items-center bg-base-100 border-b px-16 py-4 mb-8">
      <label className={"flex flex-col text-sm gap-2"}>
        <div
          className={`w-full flex rounded-md border pl-4 py-2 focus-within:border-neutral-400`}
        >
          <input
            className={"w-full bg-transparent outline-0"}
            name="username"
            placeholder={"Vyhledat projekt"}
          />
          <CiSearch size={24} className={"mx-3"} />
        </div>
      </label>

      <Link href={"/"} className="btn btn-ghost text-4xl font-bold ">
        PunchStarter
      </Link>

      <div className="flex items-stretch gap-4">
        <LinkBtn
          variant={"outlined"}
          text={"Nový projekt"}
          href={"/createProject"}
        />
        {!user ? (
          <LinkButton text={"Přihlásit se"} href={"/login"} />
        ) : (
            <div className={'relative'}>
                <Avatar />
                <UserDropdown isOpen={true} />
            </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
