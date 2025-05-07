// import { Node } from "@/types/global";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import Box from "./Box";
import BoxPool from "./BoxPool";

interface NodeType {
  path: string;
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
}

const ImageNode = ({ data }: { data: NodeType }) => {
  return (
    <>
      {data.type == "poolComponent" && (
        <>
          <Handle type="target" position={Position.Left} id={data.id} />
          <Handle type="source" position={Position.Right} id={data.id} />

          {/* <div className="w-[100px] h-[100px] border">MaxPool2d + ReLU</div> */}
          <BoxPool text={data.operation!} />
        </>
      )}
      {data.type == "boxComponent" && (
        <>
          <Handle type="target" position={Position.Left} id={data.id} />
          <Handle type="source" position={Position.Right} id={data.id} />

          {/* <div className="w-[100px] h-[100px] border">{data.operation}</div> */}
          <Box text={data.operation!} />
        </>
      )}
      {data.type == "approxInput" && (
        <>
          <Handle type="target" position={Position.Left} id={data.id} />
          <Handle type="source" position={Position.Right} id={data.id} />

          <div>
            <Image
              src={`data:image/png;base64,${data.approximateInputData}`}
              width={224}
              height={224}
              alt="Picture of the author"
            />
          </div>
        </>
      )}
      {data.type == "connector" && (
        <>
          <Handle type="target" position={Position.Left} id={data.id} />
          <Handle type="source" position={Position.Right} id={data.id} />

          <div>
            <Image
              src={`data:image/png;base64,${data.featureMapData}`}
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
