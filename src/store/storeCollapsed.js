import { create } from "zustand";

export const useCollapsed = create((set) => ({
    isCollapsed: false,
    setCollapsed: (condition) => set((state) => ({ isCollapsed: condition })),
    
  }))
  