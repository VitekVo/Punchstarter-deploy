"use client";

import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/axiosInstance";

const Avatar = ({
  username,
  size,
}: {
  username?: string;
  size?: "small" | "large";
}) => {
  const { user } = useUserContext();
  const [letters, setLetters] = useState("");
  const name = username ?? user?.username;

  function getDarkColorFromUsername() {
    // Hash the username into a numeric value
    const hash = Array.from(letters).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0,
    );

    // Generate RGB values based on the hash
    let r = (hash * 37) % 256;
    let g = (hash * 73) % 256;
    let b = (hash * 97) % 256;

    // Adjust the RGB values to ensure the luminance is ~0.3
    const targetLuminance = 0.2;
    const currentLuminance =
      0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    const adjustmentFactor = targetLuminance / currentLuminance;

    r = Math.min(255, Math.max(0, Math.floor(r * adjustmentFactor)));
    g = Math.min(255, Math.max(0, Math.floor(g * adjustmentFactor)));
    b = Math.min(255, Math.max(0, Math.floor(b * adjustmentFactor)));

    return `rgb(${r}, ${g}, ${b})`;
  }

  useEffect(() => {
    if (!name || letters) return;

    const names = name.split(" ");
    let value = "";
    names.forEach((name) => (value += name.substring(0, 1)));

    if (value != letters) setLetters(value);
  }, [name]);

  return (
    <div
      style={{
        backgroundColor: getDarkColorFromUsername(),
        border: "1px",
        borderColor: getDarkColorFromUsername(),
      }}
      className={`overflow-hidden cursor-pointer aspect-square ${size === "large" ? "w-16 text-2xl" : "w-10"} rounded-full justify-center items-center flex text-white uppercase`}
    >
      {letters}
    </div>
  );
};

export default Avatar;
