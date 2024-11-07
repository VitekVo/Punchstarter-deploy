import React from "react";
import LinkButton from "@/components/button/LinkButton";
import { CiSearch } from "react-icons/ci";
import { GiPunch } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-base-100 border-b px-16 py-4 mb-12">
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

      <a className="btn btn-ghost text-4xl font-bold ">PunchStarter</a>

      <div className="grid grid-cols-2 gap-4">
        <LinkButton text={"Nový projekt"} href={"/novy"} />
        <LinkButton text={"Přihlásit se"} href={"/login"} />
      </div>
    </div>
  );
};
export default Navbar;
