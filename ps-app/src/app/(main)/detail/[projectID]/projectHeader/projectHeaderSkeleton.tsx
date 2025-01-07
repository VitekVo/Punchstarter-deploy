import React from "react";

const ProjectHeaderSkeleton = () => {
  return (
    <div className="flex w-full lg:flex-row flex-col gap-8 h-full">
      <div className="flex flex-col lg:w-1/3 rounded-lg p-8 border gap-12">
        <div className={"h-6 w-full skeleton bg-neutral-300"}></div>
        <div className={"flex flex-col gap-3"}>
          <div className={"h-3 w-5/6 skeleton bg-neutral-300"}></div>
          <div className={"h-3 w-5/6 skeleton bg-neutral-300"}></div>
          <div className={"h-3 w-5/6 skeleton bg-neutral-300"}></div>
        </div>
      </div>
      <div className="flex-grow aspect-[16/9] skeleton bg-neutral-300 border"></div>
    </div>
  );
};

export default ProjectHeaderSkeleton;
