"use client";
import React from "react";
import ProjectCard from "@/components/projectCard/projectCard";
import { IProject } from "@/utils/types/types";
import ProjectCardSkeleton from "@/components/projectCard/projectCardSkeleton";
// Define the structure of a single project

// Define the structure of the listsData
interface ListsData {
  projects: IProject[];
}

// Component Props
interface ProjectCarouselProps {
  listsData: ListsData;
  title: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  listsData,
  title,
}) => {
  const skeletons = new Array(6).fill(0);

  console.log(listsData.projects);

  return (
    <div className={"flex flex-col gap-6"}>
      <h1 className={"text-4xl font-bold"}>{title}</h1>
      <div className={"carousel flex gap-8 overflow-y-scroll pb-12"}>
        {listsData.projects.length === 0
          ? skeletons.map((_, idx) => <ProjectCardSkeleton key={idx} />)
          : listsData.projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
