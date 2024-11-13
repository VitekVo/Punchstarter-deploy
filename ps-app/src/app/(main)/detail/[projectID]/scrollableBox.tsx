import React, { useRef } from "react";
import ProjectContent from "@/app/(main)/detail/[projectID]/projectContent/projectContent";
import CommentBox from "@/app/(main)/detail/[projectID]/projectComments/commentBox";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IProject } from "@/utils/types/types";

type TDisplayedContent = "campaign" | "comments";

interface Props {
  displayedContent: TDisplayedContent;
  setDisplayedContent: React.Dispatch<React.SetStateAction<TDisplayedContent>>;
  project: IProject;
}

const ScrollableContainer = ({
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
            ref.current.scrollLeft = 0;
            setDisplayedContent("campaign");
          }}
        >
          <IoIosArrowBack size={28} />
          popis projektu
        </div>
        <div
          className={`flex text-xl items-center gap-2 uppercase font-semibold cursor-pointer transition duration-1000 ${displayedContent === "campaign" ? "opacity-100" : "opacity-0 -translate-x-full"}`}
          onClick={() => {
            ref.current.scrollLeft = 10000;
            setDisplayedContent("comments");
          }}
        >
          komentáře
          <IoIosArrowForward size={28} />
        </div>
      </div>
      <div ref={ref} className={"h-[600px] rounded-lg carousel gap-96"}>
        <ProjectContent project={project} />
        <div id={"comments"} className={"carousel-item w-full"}>
          <div
            className={
              "w-full h-full border rounded-lg flex flex-col p-8 px-12 text-gray-700"
            }
          >
            <h2 className="text-lg uppercase font-bold">Comments Section</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollableContainer;
