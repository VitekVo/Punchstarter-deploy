import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PunchStarter | Login",
  description: "Log in to PunchStarter using this page",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "h-screen w-screen flex justify-center items-center bg-[linear-gradient(to_top,#cfd9df_0%,#e2ebf0_100%)]"
      }
    >
      {children}
    </div>
  );
};

export default Layout;
