import { create } from "zustand";

export const usePlayStore = create((set) => ({
    isPlaying: false,
    currentMusic: { playlist: null, song: null, songs: [] },
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentMusic: (currentMusic) => set({ currentMusic }),
    volume: 0.1,
    setVolume: (volume) => set({ volume })
}))