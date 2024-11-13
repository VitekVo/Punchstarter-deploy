"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { mockProjects } from "@/utils/data/mockProjectData";
import ProjectHeader from "@/app/(main)/detail/[projectID]/projectHeader/projectHeader";
import ScrollableContainer from "@/app/(main)/detail/[projectID]/scrollableBox";

const Page = () => {
  const params = useParams();
  const { projectID } = params;

  const project = mockProjects.find(
    (project) => String(project.id) === projectID,
  );

  const [displayedContent, setDisplayedContent] = useState<
    "campaign" | "comments"
  >("campaign");

  if (!project) {
    return null;
  }

  return (
    <div className="flex flex-col pb-24 px-16 w-full">
      <ProjectHeader project={project} />
      <div className="h-[1px] w-full bg-gray-300 my-12" />
      <ScrollableContainer
        setDisplayedContent={setDisplayedContent}
        displayedContent={displayedContent}
        project={project}
      />
    </div>
  );
};

export default Page;
