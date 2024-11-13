import Image from "next/image";
import ProjectProgress from "@/components/projectDetail/progress/projectProgress";
import React from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";

const ProjectHeader = ({ project }: { project: IProject }) => {
  return (
    <div className="flex lg:flex-row flex-col gap-8 h-full">
      <div className="flex flex-col lg:w-1/3 border rounded-lg p-4 justify-between">
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-xl font-bold uppercase"}>{project.title}</h2>
          <ProjectProgress
            variant={"detail"}
            currentBudget={project.currentBudget}
            targetBudget={project.targetBudget}
            backers={project.supporters}
            deadline={project.deadline}
          />
        </div>
        <Button onClick={() => {}} text={"PODPOŘIT"}></Button>
      </div>
      <div className="rounded-lg overflow-clip flex-grow">
        <Image
          src={
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={"Shoes"}
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
