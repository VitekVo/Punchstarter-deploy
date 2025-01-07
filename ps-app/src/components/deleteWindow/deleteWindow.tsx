import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import Button from "../button/Button";
import { useUserContext } from "@/context/UserContext";
import { useListContext } from "@/components/providers/ProjectProvider";
export const DeleteWindow = forwardRef(
  ({ projectId }: { projectId: number }, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const { setListsData, listsData } = useListContext();

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
      const response = await fetch(
        `http://localhost:2580/projects/${projectId}`,
        {
          method: "DELETE",

          headers: { "Content-Type": "application/json" },
          credentials: "include", // vem to z cookies
        }
      );

      try {
        if (!response.ok) {
          const error = await response.json();
          console.error("Error deleting project:", error);
        } else {
          const json = await response.json();
          const newLists = listsData?.projects.filter(
            (project) => project._id != projectId
          );
          setListsData((prevState) => ({ ...prevState, projects: newLists }));
          console.log("deleted successfully:", json);
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
          className="modal"
          onClick={(e) => e.stopPropagation()} // Stop clicks inside the modal from bubbling up
        >
          <div
            className="modal-box "
            onClick={(e) => e.stopPropagation()} // Prevent propagation within the modal box
          >
            <div className="grid grid-cols-3 gap-4 h-26">
              <div className="col-start-2">
                <h3 className="font-bold text-lg text-center">
                  Opravdu chcete trvale smazat projekt? 🙁{" "}
                </h3>
              </div>
              <div className="flex justify-end">
                <img
                  className="relative h-auto w-96"
                  src="/delete.png"
                  alt="delete project"
                />
              </div>
            </div>
            <div className="py-4 flex justify-center mt-4">
              <p className="text-lg text-center ">
                Tenhle projekt už fakt nikdy nevyhrabete!
              </p>
            </div>
            <div className="modal-action flex justify-center">
              <form method="dialog">
                <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4">
                  <div className="w-56  ">
                    <Button text={"Zavřít"} onClick={() => {}} />
                  </div>
                  <div className="w-56">
                    <Button text={"Smazat"} onClick={handleSubmit} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  }
);
