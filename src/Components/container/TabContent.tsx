import type { Booking, ParkingSpot } from "@/types/parking";
import { TabsContent } from "@/components/ui/tabs";
import { BookingCard } from "@/components/BookingCard";
import { ParkingMap } from "@/components/container/ParkingMap";
import { useMemo, useState } from "react";
import { BookingFilter } from "./BookingFilter";
import { calculateRemainingTime } from "@/utils/timeFormat";
import { ParkingFilter } from "./ParkingFilter";

interface TabContentProps {
  spots: ParkingSpot[];
  bookings: Booking[];

  handleEndSession: (bookingId: string) => void;
  handleRemoveSession: (bookingId: string) => void;
  handleSpotClick: (spot: ParkingSpot) => void;
}

const TabContent = ({
  spots,
  bookings,
  handleSpotClick,
  handleEndSession,
  handleRemoveSession,
}: TabContentProps) => {
  // Filter states for parking spots
  const [spotStatusFilter, setSpotStatusFilter] = useState("all");
  const [spotTypeFilter, setSpotTypeFilter] = useState("all");
  const [spotSearchQuery, setSpotSearchQuery] = useState("");

  const availableCount = spots.filter((s) => s.status === "tersedia").length;
  const occupiedCount = spots.filter((s) => s.status === "terisi").length;

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      if (spotStatusFilter !== "all" && spot.status !== spotStatusFilter) {
        return false;
      }

      if (spotTypeFilter !== "all" && spot.type !== spotTypeFilter) {
        return false;
      }

      if (spotSearchQuery) {
        const query = spotSearchQuery.toLowerCase();
        return spot.number.toLowerCase().includes(query);
      }

      return true;
    });
  }, [spots, spotStatusFilter, spotTypeFilter, spotSearchQuery]);

  // Filter states for bookings
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingSearchQuery, setBookingSearchQuery] = useState("");

  const activeBookings = bookings.filter((b) => b.status === "active");
  const overtimeCount = activeBookings.filter(
    (b) => calculateRemainingTime(b.startTime, b.duration) < 0
  ).length;
  const completedCount = bookings.filter(
    (s) => s.status === "completed"
  ).length;
  const normalCount = activeBookings.length - overtimeCount;

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const remaining = calculateRemainingTime(
        booking.startTime,
        booking.duration
      );
      const isOvertime = remaining < 0;
      const isActive = booking.status === "active";
      const isCompleted = booking.status === "completed";

      // Filter by status
      switch (bookingStatusFilter) {
        case "overtime":
          if (!isActive || !isOvertime) return false;
          break;
        case "active":
          if (!isActive || isOvertime) return false;
          break;
        case "completed":
          if (!isCompleted) return false;
          break;
        default:
          break;
      }

      if (bookingSearchQuery.trim() !== "") {
        const query = bookingSearchQuery.toLowerCase();
        return (
          booking.name.toLowerCase().includes(query) ||
          booking.vehicleNumber.toLowerCase().includes(query) ||
          booking.spotNumber.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [bookings, bookingStatusFilter, bookingSearchQuery]);

  return (
    <>
      <TabsContent value="map" className="mt-6 space-y-4">
        <ParkingFilter
          statusFilter={spotStatusFilter}
          typeFilter={spotTypeFilter}
          searchQuery={spotSearchQuery}
          onStatusChange={setSpotStatusFilter}
          onTypeChange={setSpotTypeFilter}
          onSearchChange={setSpotSearchQuery}
          availableCount={availableCount}
          occupiedCount={occupiedCount}
        />
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Denah Parkiran
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredSpots.length === spots.length
                ? "Klik pada spot yang tersedia untuk memesan"
                : `Menampilkan ${filteredSpots.length} dari ${spots.length} spot`}
            </p>
          </div>
          <ParkingMap spots={filteredSpots} onSpotClick={handleSpotClick} />
        </div>
      </TabsContent>
      <TabsContent value="bookings" className="mt-6 space-y-4">
        <BookingFilter
          statusFilter={bookingStatusFilter}
          searchQuery={bookingSearchQuery}
          onStatusChange={setBookingStatusFilter}
          onSearchChange={setBookingSearchQuery}
          activeCount={normalCount}
          completedCount={completedCount}
          overtimeCount={overtimeCount}
        />
        {filteredBookings.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onEndSession={handleEndSession}
                onRemoveSession={handleRemoveSession}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col py-12 space-y-2 min-h-[50vh]">
            <h3 className="text-black text-2xl">Tempat parkir masih kosong</h3>
            <small className="text-muted-foreground">
              Pilih tempat parkir pada tab{" "}
              <span className="font-bold">Denah Parkir</span>
            </small>
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default TabContent;
