import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import Button from "../button/Button";
import { useUserContext } from "@/context/UserContext";
import { ProjectCategory } from "@/utils/types/types";

import { useRouter } from "next/navigation";
import { url } from "../../../config/axiosInstance";

interface FormState {
  category: string;
  goalAmount: number;
  deadline: string;
  title: string;
  description: string;
}

export const UpdateWindow = forwardRef(
  ({ projectId, project }: { projectId: number; project: FormState }, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [amount, setAmount] = useState(0);
    const { user } = useUserContext();
    const [formState, setFormState] = useState<FormState>({
      category: project.category,
      goalAmount: project.goalAmount,
      deadline: project.deadline,
      title: project.title,
      description: project.description,
    });
    const router = useRouter();
    console.log(formState);
    function handleInputChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
      const { id, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [id]: id === "goalAmount" ? Number(value) : value,
      }));
    }
    useImperativeHandle(ref, () => ({
      openModal: () => {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      },
      closeModal: () => {
        if (modalRef.current) {
          modalRef.current.close();
        }
      },
    }));

    async function handleSubmit() {
      const updateData = {
        title: formState.title,
        description: formState.description,
        deadline: formState.deadline,
        category: formState.category,
        goalAmount: formState.goalAmount,
      };
      const response = await fetch(`${url}/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // vem to z cookies
      });

      try {
        if (!response.ok) {
          const error = await response.json();
          console.error("Error updating project:", error);
        } else {
          const json = await response.json();
          console.log("updated successfully:", json);
          router.push("/detail/" + projectId);
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    }

    return (
      <>
        <dialog
          ref={modalRef}
          id="my_modal_4"
          className="modal modal-middle"
          onClick={(e) => e.stopPropagation()} // Stop clicks inside the modal from bubbling up
        >
          <div
            className="modal-box w-auto"
            onClick={(e) => e.stopPropagation()} // Prevent propagation within the modal box
          >
            <div className="grid grid-cols-3 gap-4 h-24">
              <div className="col-start-2">
                <h3 className="font-bold text-3xl text-center">
                  Úprava projektu
                </h3>
              </div>
            </div>
            <div className="flex justify-center">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 w-96">
                  <label
                    htmlFor="title"
                    className="block text-lg font-semibold mb-2 pl-3"
                  >
                    Jméno projektu
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-5/6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark justify-center mx-3"
                  />
                </div>

                <div className="mb-4 w-96">
                  <label
                    htmlFor="description"
                    className="block text-lg font-semibold mb-2 pl-3"
                  >
                    Popis
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={formState.description}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-5/6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark justify-center mx-3"
                  />
                </div>
                <div className="mb-4 w-96">
                  <label
                    htmlFor="goalAmount"
                    className="block text-lg font-semibold mb-2 pl-3"
                  >
                    Částka
                  </label>
                  <input
                    id="goalAmount"
                    type="number"
                    step={100}
                    min={1000}
                    max={10000000}
                    value={formState.goalAmount}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-5/6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark justify-center mx-3"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-lg font-semibold mb-2 pl-3"
                  >
                    Kategorie
                  </label>
                  <select
                    id="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-5/6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark justify-center mx-3"
                  >
                    {Object.values(ProjectCategory).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 w-96">
                  <label
                    htmlFor="deadline"
                    className="block text-lg font-semibold mb-2 pl-3"
                  >
                    Deadline
                  </label>
                  <input
                    id="deadline"
                    type="date"
                    value={
                      new Date(formState.deadline).toISOString().split("T")[0]
                    }
                    onChange={handleInputChange}
                    className="input input-bordered border-primary-dark w-5/6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark justify-center mx-3"
                  />
                </div>
              </form>
            </div>

            <div className="modal-action flex justify-center">
              <form method="dialog">
                <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4">
                  <div className="w-56  ">
                    <Button text={"Zavřít"} onClick={() => {}} />
                  </div>
                  <div className="w-56">
                    <Button text={"Upravit"} onClick={handleSubmit} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  },
);
