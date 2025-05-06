"use client";

import React, { useCallback, useEffect } from "react";
import {
  addEdge,
  applyEdgeChanges,
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import ImageNode from "./ImageNode";
import useFeatureInput from "@/hooks/useFeatureInput";
import generateConvNodes from "@/libs/utils";

const nodeTypes = {
  ImageUpdater: ImageNode,
};

const ReactFlowCanva = () => {
  const { loading, layers: layerInfo } = useFeatureInput();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  useEffect(() => {
    if (!loading) {
      const { nodes: nds, edges: edgs } = generateConvNodes(loading, layerInfo);
      setNodes(nds);
      setEdges(edgs);
    }
  }, [loading]);

  // ## All about Rendering
  if (loading) return <div className="mx-auto">Loading feature Maps</div>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        connectionLineType={ConnectionLineType.SimpleBezier}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        // fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowCanva;
