"use client";
import React, { useState, useRef } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IProject } from "@/utils/types/types";
import { redirect, usePathname } from "next/navigation";
import { IoTrashBin } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { DeleteWindow } from "../deleteWindow/deleteWindow";
import { UpdateWindow } from "../updateWindow/updateWindow";
import { useUserContext } from "@/context/UserContext";
import ProjectProgress from "@/components/projectDetail/progress/projectProgress";

const ProjectCard = ({
  _id,
  title,
  description,
  category,
  creatorId,
  goalAmount,
  followCount,
  deadline,
  comments,
  images,
  sum,
}: IProject) => {
  const today: Date = new Date();
  const pathname = usePathname();

  const updateModalRef = useRef<{
    openModal: () => void;
    closeModal: () => void;
  }>(null);
  const deleteModalRef = useRef<{
    openModal: () => void;
    closeModal: () => void;
  }>(null);

  const handleOpenUpdateModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from triggering redirect
    updateModalRef.current?.openModal();
  };

  const handleOpenDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from triggering redirect
    deleteModalRef.current?.openModal();
  };
  // Calculate remaining days
  const timeDifference: number = new Date(deadline).getTime() - today.getTime();
  const days: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { user } = useUserContext();
  // Convert buffer to Base64
  const imgUrl =
    images?.length > 0
      ? `data:image/png;base64,${Buffer.from(images[0]).toString("base64")}`
      : "/path/to/placeholder-image.png";

  async function followProject() {
    const response = await fetch(
      `http://localhost:2580/users/${user?.id}/follow/${_id}`,
      {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        credentials: "include", // vem to z cookies
      }
    );

    try {
      if (!response.ok) {
        const error = await response.json();
        console.error("Error following project:", error);
      } else {
        const json = await response.json();
        console.log("followed successfully:", json);
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  }

  return (
    <div
      className={"cursor-pointer"}
      onClick={() => redirect(`/detail/${_id}`)}
    >
      <div className="card bg-base-100 w-60 shadow-xl h-[400px] flex flex-col justify-between">
        <figure className="relative">
          {images?.length > 0 ? (
            <img
              className="w-full h-[150px] object-cover"
              src={imgUrl}
              alt={title || "Project Image"}
            />
          ) : (
            <img
              className="w-full h-[150px] object-cover"
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt={title || "Project Image"}
            />
          )}
          <div className="absolute top-0 right-0 p-2">
            {pathname === "/" && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering redirect
                  setIsLiked(!isLiked);
                  followProject();
                }}
              >
                {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
            )}
            {pathname === "/userAcc" && creatorId._id === String(user?.id) && (
              <>
                <button
                  onClick={(e) => {
                    handleOpenUpdateModal(e);
                    e.stopPropagation();
                  }}
                >
                  <FaPencilAlt
                    size={40}
                    className="bg-red-400 rounded p-2 mr-1"
                  />
                </button>
                <UpdateWindow
                  ref={updateModalRef}
                  projectId={_id}
                  project={{
                    title,
                    category,
                    goalAmount,
                    deadline: String(deadline),
                    description,
                  }}
                />

                <button
                  onClick={(e) => {
                    handleOpenDeleteModal(e);
                    e.stopPropagation(); // Prevent click from triggering redirect
                  }}
                >
                  <IoTrashBin size={40} className="bg-red-400 rounded p-2" />
                </button>
                <DeleteWindow ref={deleteModalRef} projectId={_id} />
              </>
            )}
          </div>
          <div className="absolute bottom-0 right-0 p-2">
            <div className="badge uppercase font-bold text-gray-500 px-2 py-1.5">
              {category}
            </div>
          </div>
        </figure>
        <div className="card-body p-4 flex flex-col justify-between">
          <h2 className="card-title text-2xl font-bold">{title}</h2>
          <p className="text-sm text-gray-600 max-h-[50px] overflow-hidden text-ellipsis">
            {description?.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>
          <ProjectProgress sum={sum} goalAmount={goalAmount} />
          <div className="grid grid-cols-2 ">
            <div className="flex justify-start font-bold">
              {followCount} <FaUserFriends size={20} className="mx-1 pt-1" />
            </div>
            <div className="flex justify-end font-bold text-right">
              {days} days remaining
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
