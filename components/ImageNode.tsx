import { Handle, Position } from "@xyflow/react";
import Image from "next/image";

interface NodeType {
  path: string;
  type: "single" | "connector";
  id?: string;
  layer?: number;
  featureMap?: number;
  featureMapData?: string;
  approximateInputData?: string;
}

const ImageNode = ({ data }: { data: NodeType }) => {
  return (
    <>
      {data.type == "connector" && (
        <>
          <Handle type="target" position={Position.Left} id={data.id} />
          <Handle type="source" position={Position.Right} id={data.id} />

          <div>
            <Image
              // src={data.path}
              src={`data:image/png;base64,${data.approximateInputData}`}
              width={224}
              height={224}
              alt="Picture of the author"
            />
          </div>
        </>
      )}
      {data.type == "single" && (
        <>
          <Handle type="source" position={Position.Right} />
          <div>
            <Image
              src={data.path}
              // src={`data:image/png;base64, ${featureMaps[0]["approximate_input"]}`}
              width={224}
              height={224}
              alt="Picture of the author"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ImageNode;
