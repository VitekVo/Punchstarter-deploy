"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import ProjectCarousel from "@/components/projectCard/projectCarousel";
import {
  ListProvider,
  useListContext,
} from "@/components/providers/ProjectProvider";

const Page = () => {
  return (
    <>
      <ListProvider>
        <ListConsumerComponent />
      </ListProvider>
    </>
  );
};

// This component consumes the context inside the ListProvider
function ListConsumerComponent() {
  const { listsData } = useListContext();
  const { user } = useUserContext();

  console.log(typeof listsData?.projects[0]?.creatorId); // Check creatorId type
  console.log(typeof user?.id); // Check user.id type
  const filteredLists = listsData?.projects.filter(
    (list) => String(list.creatorId._id) === String(user?.id)
  );

  const followedLists = listsData?.projects.filter((list) =>
    list.followList.includes(String(user?.id))
  );

  return (
    <>
      <ProjectCarousel
        title={`My Projects (${filteredLists?.length || 0})`}
        listsData={{ projects: filteredLists || [] }}
      />
      <ProjectCarousel
        title={`Following Projects (${followedLists?.length || 0})`}
        listsData={{ projects: followedLists || [] }}
      />
    </>
  );
}

export default Page;
