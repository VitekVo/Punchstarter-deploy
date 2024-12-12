"use client";

import { redirect } from "next/navigation";

const LinkBtn = ({
  text,
  variant,
  isDisabled,
  type,
  href,
}: {
  text: string;
  variant?: "contained" | "outlined";
  isDisabled?: boolean;
  type?: "submit" | "button";
  href: string;
}) => {
  return (
    <button
      onClick={() => redirect(href)}
      disabled={isDisabled}
      type={type}
      className={`${!isDisabled ? "hover:bg-primary-dark hover:text-white" : "bg-opacity-40"} ${variant === "outlined" ? "border border-primary text-primary" : "bg-primary border-primary text-white"} transition w-fit px-4 py-2 rounded-lg`}
    >
      {text}
    </button>
  );
};

export default LinkBtn;
