"use client";
import React, { Suspense } from "react";
import ProjectCarousel from "@/components/projectCard/projectCarousel";
import { useSearchParams } from "next/navigation";
import {
  ListProvider,
  useListContext,
} from "@/components/providers/ProjectProvider";

const page = () => {
  return (
    <ListProvider>
      <Suspense
        fallback={
          <ProjectCarousel
            title="Vyhledané projekty"
            listsData={{ projects: [] }}
          />
        }
      >
        <ListConsumerComponent />
      </Suspense>
    </ListProvider>
  );
};

function ListConsumerComponent() {
  const { listsData } = useListContext();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const ProjectsSearched = (listsData?.projects || []).filter(
    (project) =>
      project.title.toLowerCase().includes((query || "").toLowerCase()), // Default to an empty string if query is null
  );

  return (
    <ProjectCarousel
      title="Vyhledané projekty"
      listsData={{ ...listsData, projects: ProjectsSearched }}
    />
  );
}

export default page;
