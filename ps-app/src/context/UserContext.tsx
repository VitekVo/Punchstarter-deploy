"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "@/utils/types/types";
import axiosInstance from "../../config/axiosInstance";

// Define the shape of the context
type UserContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null); // Initial state is null

  axiosInstance.post("/users/me").then((res) => {
    if (res.status === 200) {
      setUser(res.data);
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "useUserContext must be called from within a UserContextProvider",
    );
  }

  return context;
};
