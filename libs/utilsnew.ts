import { ApiAllResponse, Edge, Node } from "@/types/global";

const generateConvNodesNew = (
  loading: boolean,
  layerInfo: ApiAllResponse | undefined
) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const baseX = 600;
  const initialY = 200;
  const ySpacing = 300;
  const layers = 10;
  const featureMapsPerLayer = 6;
  const connectorIds = ["a", "b", "c", "d", "e", "f"];
  const layerSpacing = 100; // Increased to accommodate more nodes

  // Input image node
  const inputNode: Node = {
    id: "input-image",
    type: "ImageUpdater",
    position: { x: 0, y: initialY + (featureMapsPerLayer * ySpacing) / 2 },
    data: { path: "/Images/dog-poster.png", type: "single" },
  };
  nodes.push(inputNode);

  let currentX = baseX;

  for (let layer = 1; layer <= layers; layer++) {
    const layerY = initialY;
    // 1. Multiple Approximate Input Nodes (one per feature map from previous layer)
    const approxInputNodes: Node[] = [];
    for (let fm = 0; fm < featureMapsPerLayer; fm++) {
      const connectorId = connectorIds[fm];
      const approxNode: Node = {
        id: `approx-input-${layer}-${fm}`,
        type: "ImageUpdater",
        position: {
          x: currentX,
          y: layerY + fm * ySpacing,
        },
        data: {
          path: `/Images/img2.jpg`,
          type: "approxInput",
          id: connectorId,
          layer,
          featureMap: fm + 1,
          approximateInputData:
            layerInfo?.response[layer - 1]?.[fm]?.approximate_input,
        },
      };
      approxInputNodes.push(approxNode);
      nodes.push(approxNode);
    }
    currentX += 300;

    // 2. Single Box Component Node
    const boxComponentNode: Node = {
      id: `box-component-${layer}`,
      type: "ImageUpdater",
      position: {
        x: currentX,
        y: layerY + (featureMapsPerLayer * ySpacing) / 2,
      },
      data: {
        type: "boxComponent",
        id: "input",
        layer,
        operation: "Conv2d",
      },
    };
    nodes.push(boxComponentNode);
    currentX += 200;

    // 3. Multiple Feature Map Nodes
    const featureMapNodes: Node[] = [];
    for (let fm = 0; fm < featureMapsPerLayer; fm++) {
      const connectorId = connectorIds[fm];
      const featureMapNode: Node = {
        id: `layer-${layer}-fm-${fm}`,
        type: "ImageUpdater",
        position: {
          x: currentX,
          y: layerY + fm * ySpacing,
        },
        data: {
          path: `/Images/img2.jpg`,
          type: "connector",
          id: connectorId,
          layer,
          featureMap: fm + 1,
          featureMapData:
            layerInfo?.response[layer - 1]?.[fm]?.approximate_output,
        },
      };
      featureMapNodes.push(featureMapNode);
      nodes.push(featureMapNode);
    }
    currentX += 300;

    // 4. ReLU+MaxPool Node (except last layer)
    if (layer < layers) {
      const poolNode: Node = {
        id: `pool-component-${layer}`,
        type: "ImageUpdater",
        position: {
          x: currentX,
          y: layerY + (featureMapsPerLayer * ySpacing) / 2,
        },
        data: {
          type: "poolComponent",
          layer,
          id: "input",
          operation: "ReLU + MaxPool2d",
        },
      };

      nodes.push(poolNode);

      // Create connections for current layer
      // a) Connect previous layer to current approx inputs
      if (layer === 1) {
        // Connect input image to first layer's approx inputs
        for (let fm = 0; fm < featureMapsPerLayer; fm++) {
          const connectorId = connectorIds[fm];
          edges.push({
            id: `edge-input-to-approx-${layer}-${fm}`,
            source: "input-image",
            target: `approx-input-${layer}-${fm}`,
            targetHandle: connectorId,
          });
        }
      } else {
        // Connect previous pool to all current approx inputs
        for (let fm = 0; fm < featureMapsPerLayer; fm++) {
          const connectorId = connectorIds[fm];
          edges.push({
            id: `edge-pool-to-approx-${layer}-${fm}`,
            source: `pool-component-${layer - 1}`,
            target: `approx-input-${layer}-${fm}`,
            targetHandle: connectorId,
          });
        }
      }

      // b) Connect approx inputs to box component
      for (let fm = 0; fm < featureMapsPerLayer; fm++) {
        edges.push({
          id: `edge-approx-to-box-${layer}-${fm}`,
          source: `approx-input-${layer}-${fm}`,
          target: `box-component-${layer}`,
          targetHandle: `input`,
        });
      }

      // c) Connect box component to feature maps
      for (let fm = 0; fm < featureMapsPerLayer; fm++) {
        const connectorId = connectorIds[fm];
        edges.push({
          id: `edge-box-to-fm-${layer}-${fm}`,
          source: `box-component-${layer}`,
          target: `layer-${layer}-fm-${fm}`,
          targetHandle: connectorId,
        });
      }

      // d) Connect feature maps to pool node
      for (let fm = 0; fm < featureMapsPerLayer; fm++) {
        edges.push({
          id: `edge-fm-to-pool-${layer}-${fm}`,
          source: `layer-${layer}-fm-${fm}`,
          target: `pool-component-${layer}`,
          targetHandle: `input`,
        });
      }

      currentX += 200;
    } else {
      // Last layer connections (no pooling)
      if (layer === 1) {
        edges.push({
          id: `edge-input-to-approx-${layer}`,
          source: "input-image",
          target: `approx-input-${layer}-0`,
          targetHandle: "input",
        });
      } else {
        for (let fm = 0; fm < featureMapsPerLayer; fm++) {
          const connectorId = connectorIds[fm];
          edges.push({
            id: `edge-pool-to-approx-${layer}-${fm}`,
            source: `pool-component-${layer - 1}`,
            target: `approx-input-${layer}-${fm}`,
            targetHandle: connectorId,
          });
        }
      }

      for (let fm = 0; fm < featureMapsPerLayer; fm++) {
        edges.push({
          id: `edge-approx-to-box-${layer}-${fm}`,
          source: `approx-input-${layer}-${fm}`,
          target: `box-component-${layer}`,
          targetHandle: `input`,
        });
      }

      for (let fm = 0; fm < featureMapsPerLayer; fm++) {
        const connectorId = connectorIds[fm];
        edges.push({
          id: `edge-box-to-fm-${layer}-${fm}`,
          source: `box-component-${layer}`,
          target: `layer-${layer}-fm-${fm}`,
          targetHandle: connectorId,
        });
      }
    }

    if (layer == layers) {
      const poolNode: Node = {
        id: `pool-component-${layer}`,
        type: "ImageUpdater",
        position: {
          x: currentX,
          y: layerY + (featureMapsPerLayer * ySpacing) / 2,
        },
        data: {
          type: "poolComponent",
          layer,
          id: "input",
          operation: "Flatten + FC layers + Softmax",
        },
      };
      currentX += 400;
      nodes.push(poolNode);

      for (let fm = 0; fm < featureMapsPerLayer; fm++) {
        edges.push({
          id: `edge-fm-to-pool-${layer}-${fm}`,
          source: `layer-${layer}-fm-${fm}`,
          target: `pool-component-${layer}`,
          targetHandle: `input`,
        });
      }

      const poolNodeEND: Node = {
        id: `pool-component-${layer}-end`,
        type: "ImageUpdater",
        position: {
          x: currentX,
          y: layerY + (featureMapsPerLayer * ySpacing) / 2,
        },
        data: {
          type: "poolComponent",
          layer,
          id: "input",
          operation: "A DOG",
        },
      };
      nodes.push(poolNodeEND);

      edges.push({
        id: `edge-fm-to-pool-${layer}-end`,
        source: `pool-component-${layer}`,
        target: `pool-component-${layer}-end`,
        targetHandle: `input`,
      });
    }

    currentX += layerSpacing;
  }

  return { nodes, edges };
};

export default generateConvNodesNew;
