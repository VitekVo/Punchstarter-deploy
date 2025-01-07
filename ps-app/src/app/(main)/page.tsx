"use client";
import ProjectCarousel from "@/components/projectCard/projectCarousel";
import {
  ListProvider,
  useListContext,
} from "@/components/providers/ProjectProvider";

export default function Home() {
  return (
    <ListProvider>
      <ListConsumerComponent />
    </ListProvider>
  );
}

// This component will consume the context properly inside the ListProvider
function ListConsumerComponent() {
  const { listsData } = useListContext();

  const ProjectsDateSort = (listsData?.projects || [])
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    })
    .slice(0, 6); // Limit to 6 items

  const ProjectFollowSort = (listsData?.projects || [])
    .slice()
    .sort((a, b) => {
      const followA = a.followCount;
      const followB = b.followCount;
      return followB - followA; // Most followed first
    })
    .slice(0, 6); // Limit to 6 items

  const ProjectsDeadlineSort = (listsData?.projects || [])
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.deadline).getTime();
      const dateB = new Date(b.deadline).getTime();
      return dateA - dateB; // Closest deadline first
    })
    .slice(0, 6); // Limit to 6 items

  return (
    <div className={"flex-1 flex flex-col overflow-y-scroll"}>
      <ProjectCarousel
        title="Newest Projects"
        listsData={{ ...listsData, projects: ProjectsDateSort }}
      />
      <ProjectCarousel
        title="Most Popular Projects"
        listsData={{ ...listsData, projects: ProjectFollowSort }}
      />

      <ProjectCarousel
        title="Soon ending Projects"
        listsData={{ ...listsData, projects: ProjectsDeadlineSort }}
      />

      <ProjectCarousel
        title="All Projects"
        listsData={listsData || { message: "", projects: [] }}
      />
    </div>
  );
}
