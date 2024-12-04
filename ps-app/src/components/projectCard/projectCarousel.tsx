"use client";
import ProjectCard from "@/components/projectCard/projectCard";
import { mockProjects } from "@/utils/data/mockProjectData";
import { useListContext } from "../providers/ProjectProvider";
const ProjectCarousel = () => {
  const { listsData } = useListContext();
  return (
    <div className={"flex flex-col gap-6"}>
      <h1 className={"ml-16 text-4xl font-bold"}>Nové Projekty</h1>
      <div className={"carousel flex gap-8 overflow-y-scroll px-16 pb-12"}>
        {listsData &&
          listsData.projects.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
