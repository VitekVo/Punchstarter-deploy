"use client";
import React, { useState } from "react";
import { ProjectCategory } from "@/utils/types/types";
import Button from "../button/Button";

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
  const [step, setStep] = useState(1);

  const [formState, setFormState] = useState<FormState>({
    name: "",
    location: "",
    category: "Tech",
    goal: null,
    end: "",
    title: "",
    about: "",
    img: [],
  });

  function handleNextStep() {
    if (step === 3) return;
    setStep(step + 1);
  }

  function handleBackStep() {
    if (step === 1) return;
    setStep(step - 1);
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = {
      //Prej na to náš BE nemá budget
      //title: formState.name,
      //location: formState.location,
      category: formState.category,
      goalAmount: formState.goal,
      deadline: formState.end,
      title: formState.title,
      description: formState.about,
      images: formState.img,
      creatorId: "675215e111db830fc224cf0d", //TODO: add current logged in user when userProvider is ready
    };
    console.log(formData);
    const response = await fetch("http://localhost:2580/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("new project created", json);
    }
  }

  return (
    <>
      <div>
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
        <div className="max-w-lg mx-auto p-6">
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold mb-2"
                  >
                    Jak se jmenuješ?
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Candice Ligma"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-lg font-semibold mb-2"
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
              </div>
            ) : step === 2 ? (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="goal"
                    className="block text-lg font-semibold mb-2"
                  >
                    Kolik chceš vybrat?
                  </label>
                  <input
                    id="goal"
                    type="number"
                    step={100}
                    placeholder="5000"
                    min={0}
                    max={10000000}
                    value={formState.goal || ""}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="end"
                    className="block text-lg font-semibold mb-2"
                  >
                    Do kdy??
                  </label>
                  <input
                    id="end"
                    type="date"
                    placeholder="17.05.2004"
                    value={formState.end}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
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
                </div>
                <div className="mb-4">
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
            <div className="grid grid-cols-2 gap-10">
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
