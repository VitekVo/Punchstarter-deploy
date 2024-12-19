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

  const ProjectsDateSort = (listsData?.projects || []).slice().sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  const ProjectFollowSort = (listsData?.projects || []).slice().sort((a, b) => {
    const followA = a.followCount;
    const followB = b.followCount;
    return followB - followA;
  });

  const ProjectsDeadlineSort = (listsData?.projects || [])
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.deadline).getTime();
      const dateB = new Date(b.deadline).getTime();
      return dateA - dateB;
    });

  return (
    <>
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
    </>
  );
}
