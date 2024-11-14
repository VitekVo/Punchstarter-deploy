import type { Metadata } from "next";
import React from "react";
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
    <main className={"flex flex-col min-h-screen w-screen"}>
      <Navbar />
      <section className={"flex-grow"}>{children}</section>
      <Footer />
    </main>
  );
}