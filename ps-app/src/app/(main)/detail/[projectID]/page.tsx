"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ProjectHeader from "@/app/(main)/detail/[projectID]/projectHeader/projectHeader";
import ScrollBox from "@/app/(main)/detail/[projectID]/projectContent/scrollBox";
import {
  useListContext,
  ListProvider,
} from "@/components/providers/ProjectProvider";

const PageContent = () => {
  const params = useParams();
  const { projectID } = params;
  const { listsData } = useListContext();
  console.log(listsData);
  const project = listsData?.projects.find(
    (project) => String(project._id) === projectID
  );

  const [displayedContent, setDisplayedContent] = useState<
    "campaign" | "comments"
  >("campaign");

  if (!listsData) {
    return <p>Loading...</p>; // Add a loading state for when data is null
  }

  if (!project) {
    return <p>Project not found</p>; // Handle the case where the project is not found
  }

  return (
    <div className="flex flex-col pb-24 px-16 w-full">
      <ProjectHeader project={project} />
      <div className="h-[1px] w-full bg-gray-300 my-12" />
      <ScrollBox
        setDisplayedContent={setDisplayedContent}
        displayedContent={displayedContent}
        project={project}
      />
    </div>
  );
};

// Wrap the PageContent with ListProvider
const Page = () => (
  <ListProvider>
    <PageContent />
  </ListProvider>
);

export default Page;
