import ProjectCard from "@/components/projectCard/projectCard";
import { mockProjects } from "@/utils/data/mockProjectData";

const ProjectCarousel = () => {
  return (
    <div className={"flex flex-col gap-6"}>
      <h1 className={"ml-16 text-4xl font-bold"}>Nové Projekty</h1>
      <div className={"carousel flex gap-8 overflow-y-scroll px-16 pb-12"}>
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
