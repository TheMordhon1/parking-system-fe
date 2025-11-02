export interface ParkingSpot {
  id: string;
  number: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: "tersedia" | "terisi";
  type: "umum" | "disabilitas" | "listrik" | "valet";
}

export interface Booking {
  id: string;
  spotId: string;
  spotNumber: string;
  name: string;
  vehicleNumber: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  status: "active" | "completed" | "overtime";
  type: "umum" | "disabilitas" | "listrik" | "valet"
}

export interface BookingFormData {
  name: string;
  vehicleNumber: string;
  duration: number;
}
