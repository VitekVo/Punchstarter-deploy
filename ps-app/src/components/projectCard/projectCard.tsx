import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

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
  return (
    <div>
      <div className="card bg-base-100 w-64 shadow-xl h-full">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" // TODO: add image prop
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{title}</h2>
          <p className="max-h-24 overflow-x-scroll">{description}</p>
          <div className="badge badge-primary p-4 ">{category}</div>
          <div>
            <div className="grid grid-cols-2">
              <div className="flex justify-start text-success text-lg font-bold">
                CZK <br />
                {currentBudget}
              </div>
              <div className="flex justify-end text-success text-lg font-bold">
                <br />
                {targetBudget}
              </div>
            </div>
            <progress
              className="progress progress-success w-full h-3"
              value={currentBudget}
              max={targetBudget}
            ></progress>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="flex justify-start font-bold">
              {supporters} <FaUserFriends size={20} className="mx-1 pt-1" />
            </div>
            <div className="flex justify-end font-bold">
              {deadline.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
