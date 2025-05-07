"use client";

import React, { useCallback, useEffect } from "react";
import {
  addEdge,
  applyEdgeChanges,
  Background,
  Connection,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import ImageNode from "./ImageNode";
import useAllFeatures from "@/hooks/useAllFeatures";
import generateConvNodesNew from "@/libs/utilsnew";
import { Edge, Node, OnEdgesChange } from "@/types/global";

const nodeTypes = {
  ImageUpdater: ImageNode,
};

const ReactFlowCanva = () => {
  const { loading, layers: layerInfo } = useAllFeatures();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (!loading) {
      const { nodes: nds, edges: edgs } = generateConvNodesNew(
        loading,
        layerInfo
      );
      setNodes(nds);
      setEdges(edgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
