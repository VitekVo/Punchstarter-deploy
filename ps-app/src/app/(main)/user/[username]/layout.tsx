import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "PunchStarter | Profil",
  description: "The home page of PunchStarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
