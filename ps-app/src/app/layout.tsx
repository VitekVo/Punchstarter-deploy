import type { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import { UserContextProvider } from "@/context/UserContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "PunchStarter | Home",
  description: "The home page of PunchStarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body className={"flex flex-col min-h-screen w-screen"}>
          <Navbar />
          <main className={"flex-grow "}>{children}</main>
          <Footer />
        </body>
      </UserContextProvider>
    </html>
  );
}
