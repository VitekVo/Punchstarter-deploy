import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className={"cursor-pointer"}>
      <div className="bg-base-100 w-60 shadow-lg h-[400px] flex flex-col justify-between rounded-xl overflow-hidden">
        <div className="bg-neutral-300 skeleton w-full h-[150px] rounded-b-none"></div>
        <div className="card-body p-4 flex flex-col justify-between">
          {/*title*/}
          <div className="bg-neutral-300 skeleton h-4" />
          {/*description*/}
          <div className={"flex flex-col gap-2 w-full"}>
            <div className="bg-neutral-300 skeleton h-2 w-11/12" />
            <div className="bg-neutral-300 skeleton h-2 w-5/6" />
            <div className="bg-neutral-300 skeleton h-2 w-[90%]" />
            <div className="bg-neutral-300 skeleton h-2 w-[80%]" />
          </div>
          {/*progress*/}
          <div className={"flex flex-col gap-4 w-full"}>
            <div className={"skeleton w-full h-4 bg-neutral-300"}></div>
            <div className={"flex justify-between gap-10"}>
              <div className={"skeleton w-full h-3 bg-neutral-300"}></div>
              <div className={"skeleton w-full h-3 bg-neutral-300"}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
