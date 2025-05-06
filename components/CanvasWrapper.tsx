"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("./ReactFlowCanva"), {
  ssr: false, // Disable server-side rendering
});

const CanvasWrapper = () => {
  return <Canvas />;
};

export default CanvasWrapper;
