"use client";
const { createContext, useState } = require("react");

const initialValue = {
  collapsed: false,
  setCollapsed: () => {},
};

export const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, handleToggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
