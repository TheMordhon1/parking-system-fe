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
    if (spot.status === "tersedia") {
      return "#22c55e";
    } else {
      return "#ef4444";
    }
  };

  const getSpotIcon = (type: ParkingSpot["type"]) => {
    switch (type) {
      case "disabilitas":
        return "♿";
      case "listrik":
        return "🔋";
      case "valet":
        return "🧍🏻‍♂️";
      case "umum":
        return "🚗";
      default:
        return "";
    }
  };

  const handleMouseEnter = (
    e: KonvaEventObject<MouseEvent>,
    spot: ParkingSpot
  ) => {
    const container = e.target.getStage()?.container();
    if (container && spot.status === "tersedia") {
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
          className="bg-[#383821] border border-border rounded-lg shadow-sm"
        >
          <Layer>
            {/* Road markings */}
            {Array.from({ length: 20 }).map((_, i) => (
              <Rect
                key={`dash-${i}`}
                x={i * (stageWidth / 20) + 10}
                y={160}
                width={30}
                height={4}
                fill="hsl(48, 96%, 53%)"
              />
            ))}

            {Array.from({ length: 20 }).map((_, i) => (
              <Rect
                key={`dash-${i}`}
                x={i * (stageWidth / 20) + 10}
                y={300}
                width={30}
                height={4}
                fill="hsl(48, 96%, 53%)"
              />
            ))}

            {Array.from({ length: 20 }).map((_, i) => (
              <Rect
                key={`dash-${i}`}
                x={i * (stageWidth / 20) + 10}
                y={440}
                width={30}
                height={4}
                fill="hsl(48, 96%, 53%)"
              />
            ))}

            {/* spots */}
            <Group y={10}>
              {spots.map((spot) => {
                const isHovered = hoveredSpotId === spot.id;
                const scale =
                  isHovered && spot.status === "tersedia" ? 1.05 : 1;
                const opacity =
                  isHovered && spot.status === "tersedia"
                    ? 1
                    : spot.status === "tersedia"
                    ? 0.9
                    : 0.7;

                return (
                  <Group
                    key={spot.id}
                    x={spot.x + (spot.width * (1 - scale)) / 2}
                    y={spot.y + (spot.height * (1 - 1.02)) / 2}
                    scaleX={scale}
                    scaleY={scale}
                    onClick={() =>
                      spot.status === "tersedia" && onSpotClick(spot)
                    }
                    onTap={() =>
                      spot.status === "tersedia" && onSpotClick(spot)
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
                      text={
                        spot.status === "terisi" ? "⛔" : getSpotIcon(spot.type)
                      }
                      fontSize={30}
                      align="center"
                    />
                    <Text
                      x={0}
                      y={spot.height - 30}
                      width={spot.width}
                      text={spot.status === "tersedia" ? "TERSEDIA" : "TERISI"}
                      fontSize={10}
                      fill="#ffffff"
                      align="center"
                    />
                  </Group>
                );
              })}
            </Group>

            {/* label */}
            <Group x={25} y={stageHeight - 10}>
              {[
                { icon: "🚗", label: "Umum", x: 100 },
                { icon: "⛔", label: "Terisi", x: 200 },
                { icon: "🧍🏻‍♂️", label: "Valet", x: 300 },
                { icon: "🔋", label: "Listrik" },
                { icon: "♿", label: "Disabilitas", x: 400 },
              ].map((item) => (
                <Group key={item.label} x={item.x}>
                  <Text
                    x={0}
                    y={4}
                    width={36}
                    align="center"
                    text={item.icon}
                    fontSize={22}
                  />

                  <Text
                    x={35}
                    y={7}
                    text={item.label}
                    fontSize={16}
                    fill="#ffffff"
                    fontStyle="bold"
                  />
                </Group>
              ))}
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
