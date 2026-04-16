import { createContext, useContext, useState } from "react";

type DashboardContextType = {
  totalTasks: number;
  setTotalTasks: React.Dispatch<React.SetStateAction<number>>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [totalTasks, setTotalTasks] = useState(0);

  return (
    <DashboardContext.Provider value={{ totalTasks, setTotalTasks }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useStats() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useStats must be used within a DashboardProvider");
  }
  return context;
}
