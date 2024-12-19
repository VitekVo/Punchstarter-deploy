"use client";
import React, { useState, useRef } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IProject } from "@/utils/types/types";
import { redirect, usePathname } from "next/navigation";
import { IoTrashBin } from "react-icons/io5";
import { DeleteWindow } from "../deleteWindow/deleteWindow";

import ProjectProgress from "@/components/projectDetail/progress/projectProgress";

const ProjectCard = ({
  _id,
  title,
  description,
  category,

  goalAmount,
  followCount,
  deadline,
  comments,
  images,
  sum,
}: IProject) => {
  const today: Date = new Date();
  const pathname = usePathname();

  const modalRef = useRef<{ openModal: () => void; closeModal: () => void }>(
    null
  );

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };
  // Calculate remaining days
  const timeDifference: number = new Date(deadline).getTime() - today.getTime();
  const days: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Convert buffer to Base64
  const imgUrl =
    images.length > 0
      ? `data:image/png;base64,${Buffer.from(images[0]).toString("base64")}`
      : "/path/to/placeholder-image.png";

  return (
    <div
      className={"cursor-pointer"}
      onClick={() => redirect(`/detail/${_id}`)}
    >
      <div className="card bg-base-100 w-60 shadow-xl h-[400px] flex flex-col justify-between">
        <figure className="relative">
          {images.length > 0 ? (
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
                }}
              >
                {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
            )}
            {pathname === "/userAcc" && (
              <>
                <button
                  onClick={(e) => {
                    handleOpenModal();
                    e.stopPropagation(); // Prevent click from triggering redirect
                  }}
                >
                  <IoTrashBin size={40} className="bg-red-400 rounded p-2" />
                </button>
                <DeleteWindow ref={modalRef} projectId={_id} />
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
            {description.length > 50
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
