"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProject } from "@/utils/types/types";
import { url } from "../../../config/axiosInstance";

// 1) Create a dedicated type for your data
export type ListsDataType = {
  message: string;
  projects: IProject[];
} | null;

// 2) Your Context interface just handles listsData + setter for listsData
interface ListContextType {
  listsData: ListsDataType;
  setListsData: React.Dispatch<React.SetStateAction<ListsDataType>>;
}

// Create context with default value as `null`
const ListContext = createContext<ListContextType | null>(null);

interface ListProviderProps {
  children: ReactNode;
}

export function ListProvider({ children }: ListProviderProps) {
  const [listsData, setListsData] = useState<ListsDataType>(null);

  const fetchLists = async () => {
    try {
      const response = await fetch(`${url}/projects/load?limit=20`);
      const json = await response.json();
      if (response.ok) {
        setListsData(json);
      }
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Log `listsData` whenever it updates
  useEffect(() => {
    console.log(listsData);
  }, [listsData]);

  return (
    <ListContext.Provider value={{ listsData, setListsData }}>
      {children}
    </ListContext.Provider>
  );
}

// Custom hook to use the context
export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useListContext must be used within a ListProvider");
  }
  return context;
};
