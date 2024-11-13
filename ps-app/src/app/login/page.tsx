"use client";

import { GoEye, GoEyeClosed, GoPerson } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "@/utils/types/types";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { redirect } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserContext();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    axios
      .post<IUser>("/auth", formData)
      .then((res) => {
        if (res.status === 201) setUser(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        "flex flex-col gap-8 justify-center rounded-3xl border border-neutral-200 bg-neutral-100 shadow-lg p-16 relative"
      }
    >
      <h2 className={"text-3xl"}>Přihlášení</h2>

      <label className={"flex flex-col text-sm gap-2"}>
        Váš Email
        <div
          className={`w-full flex rounded-md border pl-4 py-2 ${error ? "border-red-500" : "focus-within:border-neutral-400"}`}
        >
          <input
            className={"w-full bg-transparent outline-0"}
            name="username"
            onChange={handleInput}
          />
          <GoPerson className={"mx-3"} size={24} />
        </div>
      </label>
      <div className="flex flex-col gap-3">
        <label className={"flex flex-col text-sm gap-2"}>
          Váše Heslo
          <div
            className={`w-full flex rounded-md border ${error ? "border-red-500" : "focus-within:border-neutral-400"} pl-4 py-2`}
          >
            <input
              className={"w-full bg-transparent outline-0"}
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleInput}
            />

            {showPassword ? (
              <GoEye
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={"mx-3 cursor-pointer"}
                size={24}
              />
            ) : (
              <GoEyeClosed
                onClick={() => setShowPassword((prevState) => !prevState)}
                className={"mx-3 cursor-pointer"}
                size={24}
              />
            )}
          </div>
        </label>
        <div className={"flex justify-between w-full gap-20"}>
          <label
            className={
              "flex gap-2 text-sm relative items-center cursor-pointer"
            }
          >
            <div
              className={`flex items-center justify-center aspect-square border rounded-md ${formData.remember ? "bg-primary border-primary" : ""}`}
            >
              <input
                type={"checkbox"}
                onChange={() =>
                  setFormData({ ...formData, remember: !formData.remember })
                }
                className={"opacity-0 absolute left-0 top-1/2 -translate-y-1/2"}
              />
              <IoMdCheckmark
                className={`opacity-${formData.remember ? "100" : "0"}`}
                size={16}
                color={"white"}
              />
            </div>
            Zapamatovat
          </label>
          <Link
            className={"transition text-sm hover:text-primary"}
            href={"/reset"}
          >
            Zapomněli jste heslo?
          </Link>
        </div>
      </div>
      <div className={"flex flex-col gap-2 items-center"}>
        <button
          // type={"submit"}
          onClick={() => redirect("/")}
          disabled={!formData.username || !formData.password || loading}
          className={`${formData.username && formData.password && !loading ? "hover:bg-primary-dark" : "bg-opacity-40"} transition w-full py-2 bg-primary text-white rounded-lg`}
        >
          Přihlásit se
        </button>
        <div className={"w-full mt-4 mb-2 h-[1px] bg-neutral-300"} />
        <div className={"flex w-full justify-center gap-4"}>
          <div
            className={
              "flex justify-center items-center p-1 border border-transparent rounded-md hover:border-neutral-300 hover:shadow"
            }
          >
            <Image
              src={"/google-logo.svg"}
              alt={"Google Logo"}
              width={32}
              height={32}
            />
          </div>
          <div
            className={
              "flex justify-center items-center p-1 border border-transparent rounded-md hover:border-neutral-300 hover:shadow"
            }
          >
            <Image
              src={"/facebook-logo.svg"}
              alt={"Facebook Logo"}
              width={32}
              height={32}
            />
          </div>
          <div
            className={
              "flex justify-center items-center p-1 border border-transparent rounded-md hover:border-neutral-300 hover:shadow"
            }
          >
            <Image
              src={"/microsoft-logo.svg"}
              alt={"Microsoft Logo"}
              width={32}
              height={32}
            />
          </div>
          <div
            className={
              "flex justify-center items-center p-1 border border-transparent rounded-md hover:border-neutral-300 hover:shadow"
            }
          >
            <Image
              src={"/apple-logo.png"}
              alt={"Apple Logo"}
              width={32}
              height={32}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-2 items-center w-full mt-4"}>
          <h3>Ještě nemáte účet?</h3>
          <Link
            className={
              "flex justify-center w-full py-2 border rounded-lg hover:border-neutral-400 transition"
            }
            href={"/signup"}
          >
            Vytvořit účet
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Page;
