import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import Button from "../button/Button";
import { useUserContext } from "@/context/UserContext";
export const DonateWindow = forwardRef(
  ({ projectId }: { projectId: number }, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [amount, setAmount] = useState(0);
    const { user } = useUserContext();
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
      const donationData = { amount, projectId: projectId, userId: user?.id };
      console.log(donationData);
      const response = await fetch("http://localhost:2580/payments", {
        method: "POST",
        body: JSON.stringify(donationData),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // vem to z cookies
      });

      try {
        if (!response.ok) {
          const error = await response.json();
          console.error("Error donating:", error);
        } else {
          const json = await response.json();
          console.log("Donated successfully:", json);
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    }

    return (
      <>
        <dialog ref={modalRef} id="my_modal_4" className="modal">
          <div className="modal-box w-8/12 max-w-5xl">
            <div className="grid grid-cols-3 gap-4 h-24">
              <div className="col-start-2">
                <h3 className="font-bold text-3xl text-center">
                  Kolik chcete přispět ❤️{" "}
                </h3>
              </div>
              <div className="flex justify-end">
                <img
                  className="relative h-auto w-52"
                  src="/donate.png"
                  alt="donate sign"
                />
              </div>
            </div>
            <div className="py-4 flex justify-center mt-4">
              <div className="mb-4 w-1/2  ">
                <input
                  id="donate"
                  type="number"
                  step={10}
                  placeholder="500"
                  min={10}
                  max={50000}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="input input-bordered border-primary-dark w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark text-center"
                />{" "}
              </div>
            </div>
            <div className="text-center text-lg font-bold    ">KČ</div>
            <div className="modal-action">
              <form method="dialog">
                <div className="grid grid-cols-3 gap-4 ">
                  <div className="w-56 flex ">
                    <Button text={"Zavřít"} onClick={() => {}} />
                  </div>
                  <div className="w-56">
                    <Button text={"Přispět"} onClick={handleSubmit} />
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
