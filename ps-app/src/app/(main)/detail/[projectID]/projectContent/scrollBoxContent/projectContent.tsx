import React from "react";
import { IProject } from "@/utils/types/types";
import { IoPersonSharp } from "react-icons/io5";
const ProjectContent = ({ project }: { project: IProject }) => {
  return (
    <div className="grid h-fit  lg:grid-cols-3 grid-cols-1 grid-rows-2 lg:grid-rows-1 gap-8 h-full carousel-item w-full max-w-">
      <div className="rounded-lg overflow-clip flex-grow border col-span-2">
        <div className="m-8">
          <h1 className="text-4xl font-bold mb-5 text-center">Story</h1>
          <div className="flex items-stretch">
            <p className="py-12 p-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In libero
              illo cupiditate repellendus sequi, ab et a, repellat hic corporis
              dolorum velit facere minus dolores at quae dolore aspernatur nemo.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
              magnam magni sapiente aperiam similique architecto dignissimos
              nostrum, itaque dolorem illum neque soluta sed quisquam fuga
              consequuntur minus officiis nihil qui. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Fugit aperiam maxime neque?
              Consectetur iure, quis corporis dignissimos alias aperiam libero
              itaque accusamus molestiae deleniti sint a nisi ducimus nemo quas.
            </p>
          </div>
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
          <h3 className="text-xl font-bold">Candice Ligma</h3>
          <h4 className="text-lg">Project Founder</h4>
        </header>
        <div className="flex flex-col border rounded-md py-4 xl:py-6 px-4 xl:px-8 gap-4 flex-grow">
          <h3 className="text-lg font-bold">About Candice Ligma</h3>
          <p className="leading-7">
            Candice Ligma is an eco-innovator and adventurer at heart, with a
            passion for creating solutions that blend sustainability with
            everyday practicality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
