"use client";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Redirect } from "next";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
const ProjectCard = ({
  id,
  title,

  description,
  category,
  currentBudget,
  targetBudget,
  supporters,
  deadline,
}: {
  id: number;
  title: string;

  description: string;
  category: string;
  currentBudget: number;
  targetBudget: number;
  supporters: number;
  deadline: Date;
}) => {
  //calculate remaining days
  const today: Date = new Date();
  const timeDifference: number = deadline.getTime() - today.getTime();
  const days: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const [isLiked, setIsLiked] = useState<boolean>(false);
  function barColor(): string {
    let percentage = (currentBudget / targetBudget) * 100;

    if (percentage < 33.33) {
      return "error";
    } else if (percentage >= 33.33 && percentage < 66.66) {
      return "warning";
    } else {
      return "success";
    }
  }
  return (
    <div>
      <div className="card bg-base-100 w-64 shadow-xl h-full">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" // TODO: add image prop
            alt="Shoes"
          />
          <div className="absolute top-0 right-0 p-2">
            <button onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </button>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{title}</h2>
          <p className="max-h-24 overflow-x-none">{description}</p>
          <div className="badge badge-primary p-4 ">{category}</div>
          <div>
            <div className="flex justify-start text-black text-lg font-bold">
              CZK
            </div>
            <div className="grid grid-cols-2">
              <div
                className={`flex justify-start text-${barColor()} text-lg font-bold`}
              >
                {currentBudget}
              </div>
              <div className="flex justify-end text-black text-lg font-bold">
                {targetBudget}
              </div>
            </div>
            <progress
              className={`progress bg-gray-700 progress-${barColor()} w-full h-3`}
              value={currentBudget}
              max={targetBudget}
            />
          </div>
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
