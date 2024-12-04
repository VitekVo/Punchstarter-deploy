import React from "react";
import { IProject } from "@/utils/types/types";
import Image from "next/image";
const ProjectContent = ({ project }: { project: IProject }) => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 grid-rows-2 lg:grid-rows-1 gap-8 h-full carousel-item w-full max-w-">
      <div className="rounded-lg overflow-clip flex-grow border col-span-2 flex flex-col gap-8">
        <h1 className="text-2xl uppercase font-bold pt-6 px-8">Story</h1>
        <div
          className={"relative w-full overflow-hidden flex items-center h-52"}
        >
          <Image
            className={"object-cover w-full h-auto"}
            alt={"Shoes"}
            src={
              "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            }
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover"
          />
        </div>

        <div className="flex items-stretch">
          <p className="px-8 pb-12">{project.description}</p>
        </div>
      </div>
      <div className="flex flex-col h-fit  border rounded-lg gap-4 pt-16 p-8">
        <header className="border rounded-md flex flex-col items-center py-4 relative pt-12 gap-1">
          <div className="rounded-full aspect-square w-20 bg-neutral-300 border-4 absolute top-0 -translate-y-1/2 flex items-center justify-center overflow-hidden">
            <div className="avatar">
              <div className="w-30 rounded-full">
                <img src="/CandiceLigma.jpg" alt="Avatar" />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold">{project.creatorId.username}</h3>
          <h4 className="text-lg">Project Founder</h4>
        </header>
        <div className="flex flex-col border rounded-md py-4 xl:py-6 px-4 xl:px-8 gap-4 flex-grow">
          <h3 className="text-lg font-bold">
            About {project.creatorId.username}
          </h3>
          <p className="leading-7">
            {project.creatorId.username} is an eco-innovator and adventurer at
            heart, with a passion for creating solutions that blend
            sustainability with everyday practicality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
