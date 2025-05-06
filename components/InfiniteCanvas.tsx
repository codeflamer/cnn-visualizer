"use client";

import { useCreateCanvaStore } from "@/stores/canvaStore";
import React, { useCallback, useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { CanvasState } from "@/types/global";
// import * as Konva from 'konva';

const InfiniteCanvas = () => {
  // const [width, setWidth] = useState();

  const { scale, position, setScale, setPosition }: CanvasState =
    useCreateCanvaStore();

  const handleWheel = useCallback(
    (e: Konva.KonvaEventObject<WheelEvent>) => {
      if (e.evt.ctrlKey) {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        if (!stage) return;

        const oldScale = scale;
        const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;

        // Zoom toward mouse pointer
        const mousePoint = stage.getPointerPosition();
        if (mousePoint) {
          setPosition({
            x:
              mousePoint.x -
              (mousePoint.x - position.x) * (newScale / oldScale),
            y:
              mousePoint.y -
              (mousePoint.y - position.y) * (newScale / oldScale),
          });
        }

        setScale(newScale);
      }
    },

    [scale, position, setScale, setPosition]
  );

  return (
    <div className="border overflow-x-hidden overflow-y-hidden">
      {scale}
      <br />
      {window.innerWidth}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={handleWheel}
        className="border-red-200"
      >
        <Layer>
          <Rect
            x={500}
            y={100}
            width={100 * scale}
            height={100 * scale}
            fill="#f0f0f0"
            draggable
            className="cursor-move"
          />

          <Rect
            x={50}
            y={200}
            width={100 * scale}
            height={100 * scale}
            fill="#f0f0f0"
            draggable
            className="cursor-move bg-red-500"
          />

          <Rect
            x={900}
            y={400}
            width={100 * scale}
            height={100 * scale}
            fill="#f0f0f0"
            draggable
            className="cursor-move"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default InfiniteCanvas;
