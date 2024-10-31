import React from "react";
import LoginBtn from "@/components/Navbar/navElements/LoginBtn";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border-b px-12 mb-12">
      <div className="navbar-start">
        <label
          className="input input-bordered flex items-center gap-2 w-96"
          style={{ margin: "20px" }}
        >
          <input type="text" className="grow" placeholder="Search" />
        </label>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-4xl font-bold ">PunchStarter</a>
      </div>
      <div className="navbar-end">
        <div className="grid grid-cols-2 gap-5">
          <a className="btn btn-success"> New project</a>
          <LoginBtn />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
