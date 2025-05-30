import { EdgeChange } from "@xyflow/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Shape = { id: string; type: "rect" | "text"; props: any };

export interface CanvasState {
  scale: number;
  position: { x: number; y: number };
  shapes: Shape[];
  setScale: (scale: number) => void;
  setPosition: (pos: { x: number; y: number }) => void;
}

export interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    path?: string;
    type:
      | "single"
      | "connector"
      | "approxInput"
      | "boxComponent"
      | "poolComponent";
    id?: string;
    layer?: number;
    featureMap?: number;
    featureMapData?: string;
    approximateInputData?: string;
    operation?: string;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  targetHandle: string;
}

export interface ApiResponse {
  response: {
    index: number;
    approximate_input: string; // base64
    approximate_output: string; // base64
  }[];
}

export interface ApiAllResponse {
  response: {
    index: number;
    approximate_input: string; // base64
    approximate_output: string; // base64
  }[][];
}

export type OnEdgesChange<EdgeType extends Edge = Edge> = (
  changes: EdgeChange<EdgeType>[]
) => void;
