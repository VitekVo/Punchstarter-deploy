"use client";

import { useParams } from "next/navigation";
import { mockProjects } from "@/utils/data/mockProjectData";
import React from "react";
import Image from "next/image";
import ProjectProgress from "@/components/projectDetail/progress/projectProgress";

const Page = () => {
  const params = useParams();
  const { projectID } = params;

  const project = mockProjects.find(
    (project) => String(project.id) === projectID,
  );

  if (!project) {
    return null;
  }

  return (
    <div className={"px-16 flex flex-col gap-4 pb-24"}>
      <main className="flex gap-x-8">
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
        <div className="flex flex-col w-1/3 border rounded-lg p-4 gap-4">
          <h2 className={"text-xl font-bold uppercase"}>{project.title}</h2>
          <ProjectProgress
            variant={"detail"}
            currentBudget={project.currentBudget}
            targetBudget={project.targetBudget}
            backers={project.supporters}
            deadline={project.deadline}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
