"use client";
import React from "react";
import { ProjectCategory } from "@/utils/types/types";
import Button from "../button/Button";
import { useState } from "react";
export const CreateForm = () => {
  const [step, setStep] = useState(1);
  function handleNextStep() {
    if (step === 3) return;
    setStep(step + 1);
  }
  return (
    <>
      <div>
        <div className="w-full text-center text-2xl"> Krok {step} z 3</div>
        <div className="max-w-lg mx-auto p-6">
          <form action="">
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
                    Název projektu?
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Future Backpack"
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="about"
                    className="block text-lg font-semibold mb-2"
                  >
                    Řekni nám o svém projektu?
                  </label>
                  <input
                    id="about"
                    type="text"
                    placeholder="Future Backpack"
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="img"
                    className="block text-lg font-semibold mb-2"
                  >
                    Nahraj obrázek projektu
                  </label>
                  <input
                    id="img"
                    type="image"
                    className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>
              </div>
            )}
            <div className="mt-8">
              <div className="flex w-48 justify-end">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  text={"Pokračovat"}
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
