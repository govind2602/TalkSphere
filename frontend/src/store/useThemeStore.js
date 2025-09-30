import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("TalkSphere-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("TalkSphere-theme", theme);
        set({ theme });
    },
}));