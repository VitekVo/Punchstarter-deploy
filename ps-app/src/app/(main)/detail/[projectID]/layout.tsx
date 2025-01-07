import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "PunchStarter | Projekt",
  description: "The home page of PunchStarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={"w-full h-full"}>{children}</section>;
}
