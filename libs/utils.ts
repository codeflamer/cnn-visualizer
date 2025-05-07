import { ApiAllResponse, Edge, Node } from "@/types/global";

const generateConvNodes = (loading: boolean, layerInfo: ApiAllResponse) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const baseX = 400;
  const initialY = 200;
  const ySpacing = 300;
  const layers = 2;
  const featureMapsPerLayer = 6;
  const connectorIds = ["a", "b", "c", "d", "e", "f"];

  // Input image node (source)
  const inputNode: Node = {
    id: "input-image",
    type: "ImageUpdater",
    position: {
      x: 0,
      y: initialY + (featureMapsPerLayer * ySpacing) / 2 - ySpacing / 2,
    },
    data: {
      path: "/Images/dog-poster.png",
      type: "single",
    },
  };
  nodes.push(inputNode);

  // Generate nodes and edges for each layer
  for (let layer = 1; layer <= layers; layer++) {
    const layerX = baseX + (layer - 1) * 400;

    // Create nodes for current layer
    const currentLayerNodes: Node[] = [];
    for (let fm = 0; fm < featureMapsPerLayer; fm++) {
      const nodeId = `layer-${layer}-fm-${fm + 1}`;
      const connectorId = connectorIds[fm];

      const newNode: Node = {
        id: nodeId,
        type: "ImageUpdater",
        position: {
          x: layerX,
          y: initialY + fm * ySpacing,
        },
        data: {
          path: `/Images/img2.jpg`,
          type: "connector",
          id: connectorId,
          layer,
          featureMap: fm + 1,
          featureMapData:
            layerInfo?.response[layer - 1]?.[fm]?.approximate_output,
          approximateInputData:
            layerInfo?.response[layer - 1]?.[fm]?.approximate_input,
        },
      };
      currentLayerNodes.push(newNode);
      nodes.push(newNode);

      // Create edges from previous layer (or input)
      if (layer === 1) {
        // Connect input to first layer
        edges.push({
          id: `edge-input-${nodeId}`,
          source: "input-image",
          target: nodeId,
          targetHandle: connectorId,
        });
      } else {
        // Connect all feature maps from previous layer to current one

        const prevNodeId = `layer-${layer - 1}-fm-${fm + 1}`;
        edges.push({
          id: `edge-${prevNodeId}-${nodeId}`,
          source: prevNodeId,
          target: nodeId,
          targetHandle: connectorId,
        });
      }
    }
  }

  return { nodes, edges };
};

export default generateConvNodes;
