import Image from "next/image";
import ProjectProgress from "@/components/projectDetail/progress/projectProgress";
import React from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";

const ProjectHeader = ({ project }: { project: IProject }) => {
  const imgUrl =
    project.images.length > 0
      ? `data:image/png;base64,${Buffer.from(project.images[0]).toString(
          "base64"
        )}`
      : "/path/to/placeholder-image.png";
  return (
    <div className="flex lg:flex-row flex-col gap-8 h-full">
      <div className="flex flex-col lg:w-1/3 border rounded-lg p-4 justify-between">
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-xl font-bold uppercase"}>{project.title}</h2>

          <ProjectProgress
            variant={"detail"}
            currentBudget={project.currentBudget}
            goalAmount={project.goalAmount}
            backers={project.followCount}
            deadline={project.deadline}
          />
        </div>
        <Button onClick={() => {}} text={"PODPOŘIT"}></Button>
      </div>
      <div className="rounded-lg overflow-clip flex-grow">
        <Image
          src={imgUrl}
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
