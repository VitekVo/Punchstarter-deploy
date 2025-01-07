import type { Metadata } from "next";
import React from "react";
import { useListContext } from "@/components/providers/ProjectProvider";

export const metadata: Metadata = {
  title: "PunchStarter | Home",
  description: "The home page of PunchStarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={"flex-1"}>{children}</div>;
}
useListContext();
