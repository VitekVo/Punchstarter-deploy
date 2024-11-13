import React from "react";
import { IProject } from "@/utils/types/types";

const ProjectComments = ({ project }: { project: IProject }) => {
  return (
    <div id={"comments"} className={"carousel-item w-full"}>
      <div
        className={
          "w-full h-full border rounded-lg flex flex-col p-8 px-12 text-gray-700"
        }
      >
        <h2 className="text-lg uppercase font-bold">komentáře</h2>
      </div>
    </div>
  );
};

export default ProjectComments;
