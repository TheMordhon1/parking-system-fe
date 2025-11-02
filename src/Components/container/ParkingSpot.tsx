import type { ParkingSpot } from "@/types/parking";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import React, { useRef, useState } from "react";
import { Group, Layer, Rect, Stage, Text } from "react-konva";

interface ParkingMapProps {
  spots: ParkingSpot[];
  onSpotClick: (spot: ParkingSpot) => void;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({
  spots,
  onSpotClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [hoveredSpotId, setHoveredSpotId] = useState<string | null>(null);

  const stageScale = 1;
  const stageWidth = 1000;
  const stageHeight = 600;

  const getSpotColor = (spot: ParkingSpot) => {
    if (spot.status === "available") {
      switch (spot.type) {
        case "electric":
          return "#3b82f6";
        case "disabled":
          return "#a855f7";
        case "valet":
          return "#f97316";
        default:
          return "#22c55e";
      }
    } else {
      return "#ef4444";
    }
  };

  const getSpotIcon = (type: ParkingSpot["type"]) => {
    switch (type) {
      case "disabled":
        return "♿";
      case "electric":
        return "🔋";
      case "valet":
        return "🅿️";
      default:
        return "🚗";
    }
  };

  const handleMouseEnter = (
    e: KonvaEventObject<MouseEvent>,
    spot: ParkingSpot
  ) => {
    const container = e.target.getStage()?.container();
    if (container && spot.status === "available") {
      container.style.cursor = "pointer";
      setHoveredSpotId(spot.id);
    }
  };

  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    if (container) {
      container.style.cursor = "default";
    }
    setHoveredSpotId(null);
  };

  return (
    <div ref={containerRef} className="w-full overflow-x-auto py-6">
      <div
        style={{
          width: `${stageWidth}px`,
          minWidth: "800px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stage
          ref={stageRef}
          width={stageWidth - 25}
          height={stageHeight + 30}
          scaleX={stageScale}
          scaleY={stageScale}
          className="bg-blue-300 border border-border rounded-lg shadow-sm"
        >
          <Layer>
            <Group x={25} y={stageHeight - 10}>
              <Rect x={0} y={0} width={20} height={20} fill="#22c55e" />
              <Text x={25} y={2} text="Tersedia" fontSize={14} fill="#ffffff" />

              <Rect x={100} y={0} width={20} height={20} fill="#ef4444" />
              <Text x={125} y={2} text="Terisi" fontSize={14} fill="#ffffff" />

              <Rect x={200} y={0} width={20} height={20} fill="#f97316" />
              <Text x={225} y={2} text="Valet" fontSize={14} fill="#ffffff" />

              <Rect x={300} y={0} width={20} height={20} fill="#3b82f6" />
              <Text x={325} y={2} text="Listrik" fontSize={14} fill="#ffffff" />

              <Rect x={400} y={0} width={20} height={20} fill="#a855f7" />
              <Text
                x={425}
                y={2}
                text="Disabilitas"
                fontSize={14}
                fill="#ffffff"
              />
            </Group>

            <Group y={10}>
              {spots.map((spot) => {
                const isHovered = hoveredSpotId === spot.id;
                const scale =
                  isHovered && spot.status === "available" ? 1.05 : 1;
                const opacity =
                  isHovered && spot.status === "available"
                    ? 1
                    : spot.status === "available"
                    ? 0.9
                    : 0.4;

                return (
                  <Group
                    key={spot.id}
                    x={spot.x + (spot.width * (1 - scale)) / 2}
                    y={spot.y + (spot.height * (1 - scale)) / 2}
                    scaleX={scale}
                    scaleY={scale}
                    onClick={() =>
                      spot.status === "available" && onSpotClick(spot)
                    }
                    onTap={() =>
                      spot.status === "available" && onSpotClick(spot)
                    }
                    onMouseEnter={(e) => handleMouseEnter(e, spot)}
                    onMouseLeave={handleMouseLeave}
                    opacity={opacity}
                  >
                    <Rect
                      width={spot.width}
                      height={spot.height}
                      fill={getSpotColor(spot)}
                      stroke="#ffffff"
                      strokeWidth={2}
                      cornerRadius={4}
                    />
                    <Text
                      x={0}
                      y={10}
                      width={spot.width}
                      text={spot.number}
                      fontSize={16}
                      fontStyle="bold"
                      fill="#ffffff"
                      align="center"
                    />
                    <Text
                      x={0}
                      y={spot.height / 2 - 15}
                      width={spot.width}
                      text={getSpotIcon(spot.type)}
                      fontSize={30}
                      align="center"
                    />
                    <Text
                      x={0}
                      y={spot.height - 30}
                      width={spot.width}
                      text={spot.status === "available" ? "TERSEDIA" : "TERISI"}
                      fontSize={10}
                      fill="#ffffff"
                      align="center"
                    />
                  </Group>
                );
              })}
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
