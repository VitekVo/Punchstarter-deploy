"use client";
import React, { useRef, useState } from "react";
import { ProjectCategory } from "@/utils/types/types";
import Button from "../button/Button";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { url } from "../../../config/axiosInstance";

interface FormState {
  name: string;
  location: string;
  category: string;
  goal: number | null;
  end: string;
  title: string;
  about: string;
  img: File[];
}

export const CreateForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { user } = useUserContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<FormState>({
    name: user?.username || "",
    location: "",
    category: "Tech",
    goal: null,
    end: "",
    title: "",
    about: "",
    img: [],
  });

  if (!user) {
    return <div>Nejsi přihlášen!</div>;
  }

  function handleNextStep() {
    if (step === 3) return;
    if (!nameRef.current || !dateRef.current || !goalRef.current) return;
    if (step === 1) {
      if (!formState.name) {
        nameRef.current.classList.remove("opacity-0");
        nameRef.current.classList.add("opacity-100");
        return;
      }
    } else if (step === 2) {
      console.log(formState);

      if (
        Number(formState.goal) < 1000 ||
        !formState.end ||
        new Date(formState.end).getTime() < Date.now()
      ) {
        if (!formState.end || new Date(formState.end).getTime() < Date.now()) {
          dateRef.current.classList.remove("opacity-0");
          dateRef.current.classList.add("opacity-100");
        } else {
          dateRef.current.classList.remove("opacity-100");
          dateRef.current.classList.add("opacity-0");
        }
        if (Number(formState.goal) < 1000) {
          goalRef.current.classList.remove("opacity-0");
          goalRef.current.classList.add("opacity-100");
        } else {
          goalRef.current.classList.remove("opacity-100");
          goalRef.current.classList.add("opacity-0");
        }
        return;
      }
    }
    setStep(step + 1);
  }

  function handleBackStep() {
    if (step === 1) return;
    setStep(step - 1);
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: id === "goal" ? Number(value) : value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormState((prev) => ({
      ...prev,
      img: [...prev.img, ...files], // Append new files to the existing array
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!titleRef.current || !descriptionRef.current) return;

    if (!formState.title || formState.about.length < 10) {
      if (!formState.title) {
        titleRef.current.classList.remove("opacity-0");
        titleRef.current.classList.add("opacity-100");
      } else {
        titleRef.current.classList.remove("opacity-100");
        titleRef.current.classList.add("opacity-0");
      }
      if (formState.about.length < 10) {
        descriptionRef.current.classList.remove("opacity-0");
        descriptionRef.current.classList.add("opacity-100");
      } else {
        descriptionRef.current.classList.remove("opacity-100");
        descriptionRef.current.classList.add("opacity-0");
      }
      return;
    }

    if (!user || !user.id) {
      console.error("User data is not available.");
      return;
    }

    const formData = new FormData();
    formData.append("category", formState.category);
    formData.append("goalAmount", formState.goal?.toString() || "");
    formData.append("deadline", formState.end);
    formData.append("title", formState.title);
    formData.append("description", formState.about);
    formData.append("creatorId", String(user.id));

    formState.img.forEach((file) => {
      formData.append("images", file, file.name);
    });
    let json;
    try {
      const response = await fetch(`${url}/projects/`, {
        method: "POST",
        body: formData,
        credentials: "include", // vem to z cookies
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error creating project:", error);
      } else {
        json = await response.json();
        console.log("Project created successfully:", json);
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
    router.push("/detail/" + json.project._id);
  }

  return (
    <>
      <div
        className={"flex flex-col items-center p-8 h-full max-md:text-white"}
      >
        <div className="w-full text-center">
          <ul className="steps">
            <li className="step step-primary">O tobě</li>
            <li className={step > 1 ? "step step-primary" : "step"}>
              Tvůj cíl
            </li>
            <li className={step > 2 ? "step step-primary" : "step"}>
              O projektu
            </li>
          </ul>
        </div>
        <div className={"max-w-3xl w-full h-full flex-1"}>
          <form
            onSubmit={handleSubmit}
            className={"h-full flex flex-col gap-y-2"}
          >
            {step === 1 ? (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold mb-2"
                  >
                    Jak se jmenuješ?
                  </label>
                  <input
                    required={true}
                    id="name"
                    type="text"
                    placeholder="Candice Ligma"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                  <p
                    ref={nameRef}
                    className={"italic text-sm text-red-600 mt-1 opacity-0"}
                  >
                    Jméno nemůže být prázdné
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-lg font-semibold"
                  >
                    Kde žiješ?
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Ligmovice"
                    value={formState.location}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                  <p className={"italic text-sm text-red-600 mt-1 opacity-0"}>
                    Placeholder
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-lg font-semibold mb-2"
                  >
                    Kategorie
                  </label>
                  <select
                    id="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="select select-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  >
                    {Object.values(ProjectCategory).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : step === 2 ? (
              <div>
                <div>
                  <label
                    htmlFor="goal"
                    className="block text-lg font-semibold mb-2"
                  >
                    Kolik chceš vybrat?
                  </label>
                  <input
                    id="goal"
                    type="number"
                    step={1000}
                    placeholder="5000 Kč"
                    min={1000}
                    max={10000000}
                    value={formState.goal || ""}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                  <p
                    ref={goalRef}
                    className={"italic text-sm text-red-600 mt-1 opacity-0"}
                  >
                    Minimální částka je 1000Kč
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="end"
                    className="block text-lg font-semibold mb-2"
                  >
                    Do kdy?
                  </label>
                  <input
                    id="end"
                    type="date"
                    placeholder="17.05.2004"
                    value={formState.end}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                  <p
                    ref={dateRef}
                    className={"italic text-sm text-red-600 mt-1 opacity-0"}
                  >
                    Takové datum nemůžete použít
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-lg font-semibold mb-2"
                  >
                    Název projektu
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Future Backpack"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                  <p
                    ref={titleRef}
                    className={"italic text-sm text-red-600 mt-1 opacity-0"}
                  >
                    Název projektu nemůže být prázdný
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-lg font-semibold mb-2"
                  >
                    Řekni nám o svém projektu
                  </label>
                  <input
                    id="about"
                    type="text"
                    placeholder="Můj projekt je super..."
                    value={formState.about}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                  <p
                    ref={descriptionRef}
                    className={"italic text-sm text-red-600 mt-1 opacity-0"}
                  >
                    Minimální délka popisu je 10 znaků
                  </p>
                </div>

                <div className="mb-4 text-center">
                  <label
                    htmlFor="img"
                    className="block text-lg font-semibold mb-2"
                  >
                    Nahraj obrázek projektu
                  </label>
                  <input
                    id="img"
                    type="file"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-10 mt-auto">
              <div className="mt-8">
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={handleBackStep}
                    text={"Zpět"}
                  />
                </div>
              </div>
              {step === 3 ? (
                <div className="mt-8">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className={`
                         "hover:bg-primary-dark"  "bg-opacity-40"
                       transition w-full py-2 bg-primary text-white rounded-lg`}
                    >
                      Vytvořit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      text={"Další"}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
