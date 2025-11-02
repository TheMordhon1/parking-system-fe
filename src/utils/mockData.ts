import type { Booking, ParkingSpot } from "@/types/parking";

export const generateMockParkingSpots = (): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  const rows = 4;
  const cols = 8;
  const spotWidth = 80;
  const spotHeight = 120;
  const gap = 20;

  let counter = 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isOccupied = Math.random() > 0.6; // 40% occupied
      const type = col === 0 ? "disabled" : col === 1 ? "electric" : col === 2 ? "regular" : "valet";

      spots.push({
        id: `spot-${counter}`,
        number: `A${counter}`,
        x: col * (spotWidth + gap) + gap,
        y: row * (spotHeight + gap) + gap,
        width: spotWidth,
        height: spotHeight,
        status: isOccupied ? "occupied" : "available",
        type,
      });

      counter++;
    }
  }

  return spots;
};


export const generateMockBookings = (spots: ParkingSpot[]): Booking[] => {
  const occupiedSpots = spots.filter(spot => spot.status === "occupied");

  return occupiedSpots.map((spot, index) => {
    const startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() - Math.floor(Math.random() * 120));

    return {
      id: `booking-${index + 1}`,
      spotId: spot.id,
      spotNumber: spot.number,
      name: `User ${index + 1}`,
      vehicleNumber: `B ${1000 + index} XYZ`,
      startTime,
      duration: 60 + Math.floor(Math.random() * 120),
      status: "active" as const,
    };
  });
};