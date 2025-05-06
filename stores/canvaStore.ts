import { CanvasState } from "@/types/global";
import { create } from "zustand";

export const useCreateCanvaStore = create((set) => {
  return {
    scale: 1,
    position: { x: 0, y: 0 },
    setScale: (scale: Pick<CanvasState, "scale">) => set({ scale: scale }),
    setPosition: (position: Pick<CanvasState, "position">) => set({ position }),
  };
});
