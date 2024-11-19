import React from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
const ProjectComments = ({ project }: { project: IProject }) => {
  return (
    <div id={"comments"} className={"carousel-item w-full"}>
      <div
        className={
          "w-full h-full border rounded-lg flex flex-col p-8 px-12 text-gray-700"
        }
      >
        <div className="grid grid-cols-7">
          <h2 className="text-lg uppercase font-bold">komentáře</h2>
          <div className="col-start-7">
            <Button text={"Add comment"} onClick={() => {}}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComments;
