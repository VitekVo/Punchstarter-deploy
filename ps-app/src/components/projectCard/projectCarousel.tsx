"use client";
import React from "react";
import ProjectCard from "@/components/projectCard/projectCard";
import { IProject } from "@/utils/types/types";
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
  return (
    <div className={"flex flex-col gap-6"}>
      <h1 className={"text-4xl font-bold"}>{title}</h1>
      <div className={"carousel flex gap-8 overflow-y-scroll pb-12"}>
        {listsData.projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
