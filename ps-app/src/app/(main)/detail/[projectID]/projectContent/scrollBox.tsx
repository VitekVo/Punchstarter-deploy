import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IProject } from "@/utils/types/types";
import ProjectContent from "@/app/(main)/detail/[projectID]/projectContent/scrollBoxContent/projectContent";
import ProjectComments from "@/app/(main)/detail/[projectID]/projectContent/scrollBoxContent/projectComments";

type TDisplayedContent = "campaign" | "comments";

interface Props {
  displayedContent: TDisplayedContent;
  setDisplayedContent: React.Dispatch<React.SetStateAction<TDisplayedContent>>;
  project: IProject;
}

const ScrollBox = ({
  displayedContent,
  setDisplayedContent,
  project,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={"w-full flex justify-between mb-4"}>
        <div
          className={`flex text-xl items-center gap-2 uppercase font-semibold cursor-pointer transition duration-1000 ${displayedContent === "comments" ? "opacity-100" : "opacity-0 translate-x-full"}`}
          onClick={() => {
            ref.current!.scrollLeft = 0;
            setDisplayedContent("campaign");
          }}
        >
          <IoIosArrowBack size={28} />
          popis projektu
        </div>
        <div
          className={`flex text-xl items-center gap-2 uppercase font-semibold cursor-pointer transition duration-1000 ${displayedContent === "campaign" ? "opacity-100" : "opacity-0 -translate-x-full"}`}
          onClick={() => {
            ref.current!.scrollLeft = 10000;
            setDisplayedContent("comments");
          }}
        >
          komentáře
          <IoIosArrowForward size={28} />
        </div>
      </div>
      <div ref={ref} className={"h-auto rounded-lg carousel gap-12"}>
        <ProjectContent project={project} />
        <ProjectComments project={project} />
      </div>
    </>
  );
};

export default ScrollBox;
