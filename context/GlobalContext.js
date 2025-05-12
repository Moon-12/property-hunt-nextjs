"use client";
import { createContext, useContext, useState } from "react";
import React from "react";

const GlobalContext = React.createContext();

export function GlobalContextProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
