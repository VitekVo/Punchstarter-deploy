"use client";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
import { IProject } from "@/utils/types/types";
import { categoryColor } from "./helpers/categoryColor";
import { redirect } from "next/navigation";
import ProjectProgress from "@/components/projectDetail/progress/projectProgress";
const ProjectCard = ({
  id,
  title,

  description,
  category,
  currentBudget,
  targetBudget,
  supporters,
  deadline,
  comments,
}: IProject) => {
  //calculate remaining days
  //mělo by vracet api, ne se počítat na fe #reportJarda
  const today: Date = new Date();
  const timeDifference: number = deadline.getTime() - today.getTime();
  const days: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <div className={"cursor-pointer"} onClick={() => redirect(`/detail/${id}`)}>
      <div className="card bg-base-100 w-52 shadow-xl h-full">
        <figure className={"relative"}>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" // TODO: add image prop
            alt="Shoes"
          />
          <div className="absolute top-0 right-0 p-2">
            <button onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </button>
          </div>
          <div className="absolute bottom-0 right-0 p-2">
            <div
              className={`badge uppercase font-bold text-gray-500 px-2 py-1.5`}
            >
              {category}
            </div>
          </div>
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-2xl font-bold">{title}</h2>
          <p className="max-h-20 overflow-x-none overflow-hidden">
            {description}
          </p>
          <ProjectProgress
            currentBudget={currentBudget}
            targetBudget={targetBudget}
          />
          <div className="grid grid-cols-2 ">
            <div className="flex justify-start font-bold">
              {supporters} <FaUserFriends size={20} className="mx-1 pt-1" />
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
