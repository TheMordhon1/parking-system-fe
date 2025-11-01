export interface ParkingSpot {
  id: string;
  number: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: "available" | "occupied";
  type: "regular" | "disabled" | "electric" | "valet";
}

export interface Booking {
  id: string;
  spotId: string;
  spotNumber: string;
  name: string;
  vehicleNumber: string;
  startTime: Date;
  duration: number;
  status: "active" | "completed" | "overtime";
}

export interface BookingFormData {
  name: string;
  vehicleNumber: string;
  duration: number;
}
