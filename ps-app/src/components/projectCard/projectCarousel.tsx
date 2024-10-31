import ProjectCard from "@/components/projectCard/projectCard";

const ProjectCarousel = () => {
  return (
    <div className={"flex flex-col gap-6"}>
      <h1 className={"ml-16 text-4xl font-bold"}>Nové Projekty</h1>
      <div className={"carousel flex gap-4 overflow-y-scroll px-16 pb-12"}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectCarousel;
