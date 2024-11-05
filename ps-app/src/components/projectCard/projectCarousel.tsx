import ProjectCard from "@/components/projectCard/projectCard";
import { IProject } from "@/utils/types/types";
const mockProjects: IProject[] = [
  {
    id: 1,
    title: "Solar-Powered Backpack",
    description:
      "A backpack with built-in solar panels to charge devices on the go.",
    category: "Tech",
    currentBudget: 5000,
    targetBudget: 20000,
    supporters: 150,
    deadline: new Date("2024-12-01"),
  },
  {
    id: 2,
    title: "Eco-Friendly Yoga Mats",
    description:
      "Sustainable yoga mats made from natural, biodegradable materials.",
    category: "Other",
    currentBudget: 12000,
    targetBudget: 25000,
    supporters: 220,
    deadline: new Date("2024-11-15"),
  },
  {
    id: 3,
    title: "Smart Herb Garden",
    description:
      "A compact indoor garden with smart features to grow herbs year-round.",
    category: "Art",
    currentBudget: 14000,
    targetBudget: 15000,
    supporters: 300,
    deadline: new Date("2024-12-20"),
  },
  {
    id: 4,
    title: "Storytelling Game",
    description:
      "A role-playing game that adapts based on player choices and actions.",
    category: "Game",
    currentBudget: 9000,
    targetBudget: 30000,
    supporters: 450,
    deadline: new Date("2024-12-10"),
  },
  {
    id: 5,
    title: "Artisan Coffee Roaster",
    description:
      "Compact coffee roaster designed for home baristas and coffee lovers.",
    category: "Food",
    currentBudget: 15000,
    targetBudget: 40000,
    supporters: 180,
    deadline: new Date("2024-12-05"),
  },
  {
    id: 6,
    title: "Portable Water Purifier",
    description:
      "A lightweight, portable purifier that turns any water into safe drinking water.",
    category: "Film",
    currentBudget: 7000,
    targetBudget: 20000,
    supporters: 270,
    deadline: new Date("2024-11-30"),
  },
];

const ProjectCarousel = () => {
  return (
    <div className={"flex flex-col gap-6"}>
      <h1 className={"ml-16 text-4xl font-bold"}>Nové Projekty</h1>
      <div className={"carousel flex gap-4 overflow-y-scroll px-16 pb-12"}>
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
