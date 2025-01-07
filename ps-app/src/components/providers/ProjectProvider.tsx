"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { IProject } from "@/utils/types/types";
import { url } from "../../../config/axiosInstance";
// Define the shape of your context value
interface ListContextType {
  listsData: {
    message: string;
    projects: IProject[];
  } | null; // Může být null, pokud data ještě nejsou načtena
  setListsData: React.Dispatch<React.SetStateAction<ListContextType>>;
}

// Create context with default value as `null`
const ListContext = createContext<ListContextType | null>(null);

interface ListProviderProps {
  children: ReactNode;
}

export function ListProvider({ children }: ListProviderProps) {
  const [listsData, setListsData] = useState<any>(null); // Replace `any` with your data type

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
