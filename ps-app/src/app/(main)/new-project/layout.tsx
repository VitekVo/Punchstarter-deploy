import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "PunchStarter | Home",
  description: "The home page of PunchStarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={"flex-1 flex flex-col"}>{children}</div>;
}
