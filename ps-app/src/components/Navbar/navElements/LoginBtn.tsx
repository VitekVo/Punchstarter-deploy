"use client";

import React from "react";
import { redirect } from "next/navigation";

const LoginBtn = () => {
  return (
    <a onClick={() => redirect("/login")} className="btn btn-success">
      Log in →
    </a>
  );
};

export default LoginBtn;
