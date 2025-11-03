import type { Booking, ParkingSpot } from "@/types/parking";
import moment from "moment";

const STORAGE_KEYS = {
  SPOTS: "parking-spots",
  BOOKINGS: "parking-bookings",
};


export const saveSpots = (spots: ParkingSpot[]): void => {
  localStorage.setItem(STORAGE_KEYS.SPOTS, JSON.stringify(spots));
};


export const loadSpots = (): ParkingSpot[] | null => {
  const data = localStorage.getItem(STORAGE_KEYS.SPOTS);
  return data ? JSON.parse(data) : null;
};


export const saveBookings = (bookings: Booking[]): void => {
  const serializedBookings = bookings.map(booking => ({
    ...booking,
    startTime: moment(booking.startTime).toISOString(),
  }));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(serializedBookings));

};


export const loadBookings = (): Booking[] | null => {
  const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  if (!data) return null;

  const parsed = JSON.parse(data);
  return parsed.map((booking: any) => ({
    ...booking,
    startTime: moment(booking.startTime),
  }));
};

export const removeBookingById = (bookingId: string): Booking[] | undefined => {
  const current = loadBookings();
  if (current) {
    const updated = current.filter((b) => b.id !== bookingId);
    saveBookings(updated);
    return updated;
  }
  return;
};
