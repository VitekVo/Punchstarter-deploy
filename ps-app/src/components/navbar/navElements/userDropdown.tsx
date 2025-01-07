import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import axiosInstance from "../../../../config/axiosInstance";
import React, { SetStateAction, useEffect, useRef } from "react";

const UserDropdown = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, setUser } = useUserContext();

  const logout = () => {
    axiosInstance.post("users/logout").then(() => {
      setUser(null);
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (containerRef.current && !containerRef.current.contains(target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks
    document.addEventListener("mouseup", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${isOpen ? "flex" : "hidden"} flex-col bg-white translate-y-3 shadow-lg w-36 rounded-md absolute border right-0 z-10 p-2 px-3 text-gray-600 gap-y-1.5`}
    >
      <Link
        href={`/user/${user?.username}`}
        className={"font-semibold"}
        onClick={() => setOpen(false)}
      >
        {user?.username}
      </Link>
      <div onClick={logout} className={"cursor-pointer"}>
        Odhlásit se
      </div>
    </div>
  );
};

export default UserDropdown;
