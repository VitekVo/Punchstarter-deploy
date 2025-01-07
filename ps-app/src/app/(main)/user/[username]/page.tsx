"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import ProjectCarousel from "@/components/projectCard/projectCarousel";
import {
  ListProvider,
  useListContext,
} from "@/components/providers/ProjectProvider";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const { username } = params;

  const filteredLists = listsData?.projects.filter(
    (list) => String(list.creatorId._id) === String(user?.id),
  );

  const followedLists = listsData?.projects.filter((list) =>
    list.followList.includes(String(user?.id)),
  );

  return (
    <>
      {user?.username === username && (
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
      )}
    </>
  );
}

export default Page;
