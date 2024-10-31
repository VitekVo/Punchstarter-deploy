"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { GoPerson, GoEye, GoEyeClosed } from "react-icons/go";

import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    //TODO: api auth call
  };

  return (
    <div
      className={
        "h-screen w-screen flex justify-center items-center bg-[linear-gradient(to_top,#cfd9df_0%,#e2ebf0_100%)]"
      }
    >
      <form
        onSubmit={handleSubmit}
        className={
          "flex flex-col gap-8 justify-center rounded-3xl border border-neutral-200 bg-neutral-100 shadow-lg p-16"
        }
      >
        <h2 className={"text-3xl"}>Přihlášení</h2>
        <label className={"flex flex-col text-sm gap-2"}>
          Váš Email
          <div
            className={
              "w-full flex rounded-md border focus-within:border-neutral-400 pl-4 py-2"
            }
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
              className={
                "w-full flex rounded-md border focus-within:border-neutral-400 pl-4 py-2"
              }
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
                className={`flex items-center justify-center aspect-square border rounded-md ${formData.remember ? "bg-emerald-600 border-emerald-600" : ""}`}
              >
                <input
                  type={"checkbox"}
                  onChange={() =>
                    setFormData({ ...formData, remember: !formData.remember })
                  }
                  className={
                    "opacity-0 absolute left-0 top-1/2 -translate-y-1/2"
                  }
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
              className={"transition text-sm hover:text-emerald-600"}
              href={"/reset"}
            >
              Zapomněli jste heslo?
            </Link>
          </div>
        </div>
        <div className={"flex flex-col gap-2 items-center"}>
          <button
            disabled={loading}
            className={`transition w-full py-2 ${loading ? "bg-emerald-500" : "bg-emerald-600 hover:bg-emerald-700"} text-white rounded-lg`}
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
          <div className={"flex flex-col gap-2 items-center w-full mt-8"}>
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
    </div>
  );
};

export default Page;
