"use client";

import { redirect } from "next/navigation";

const Button = ({
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
      className={`${!isDisabled ? "hover:bg-primary-dark" : "bg-opacity-40"} transition w-fit px-4 py-2 bg-primary text-white rounded-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
