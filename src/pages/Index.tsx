import { BookingForm } from "@/components/BookingForm";
import Header from "@/components/Header";
import { StatsCol } from "@/components/container/StatsCol";
import TabContent from "@/components/container/TabContent";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Booking, BookingFormData, ParkingSpot } from "@/types/parking";
import { generateMockParkingSpots } from "@/utils/mockData";
import {
  loadBookings,
  loadSpots,
  removeBookingById,
  saveBookings,
  saveSpots,
} from "@/utils/useLocalStorage";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadedSpots = loadSpots();
    const loadedBookings = loadBookings();
    if (loadedSpots && loadedBookings) {
      setSpots(loadedSpots);
      setBookings(loadedBookings);
    } else {
      setSpots(generateMockParkingSpots);
      // setBookings(bookingsMock);
    }
  }, []);

  const handleSpotClick = (spot: ParkingSpot) => {
    if (spot.status === "tersedia") {
      setSelectedSpot(spot);
      setIsFormOpen(true);
    }
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    if (!selectedSpot) return;

    const newBooking: Booking = {
      id: `P-${moment().unix()}`,
      spotId: selectedSpot.id,
      spotNumber: selectedSpot.number,
      name: data.name,
      vehicleNumber: data.vehicleNumber,
      startTime: new Date(),
      duration: data.duration,
      status: "active",
      type: selectedSpot.type,
    };

    const updatedSpots = spots.map((s) =>
      s.id === selectedSpot.id ? { ...s, status: "terisi" as const } : s
    );

    const updatedBookings = [...bookings, newBooking];

    setSpots(updatedSpots);
    setBookings(updatedBookings);
    saveSpots(updatedSpots);
    saveBookings(updatedBookings);

    toast.success(`Booking untuk ${selectedSpot.id} berhasil.`);

    setIsFormOpen(false);
    setSelectedSpot(null);
  };

  const handleEndSession = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const updatedSpots = spots.map((s) =>
      s.id === booking.spotId ? { ...s, status: "tersedia" as const } : s
    );

    const updatedBookings = bookings.map((b) =>
      b.id === bookingId
        ? {
            ...b,
            status: "completed" as const,
            endTime: new Date(),
          }
        : b
    );

    setSpots(updatedSpots);
    setBookings(updatedBookings);
    saveSpots(updatedSpots);
    saveBookings(updatedBookings);

    toast.success(`Sesi parkir spot ${booking.spotNumber} telah diakhiri`);
  };

  const handleRemoveSession = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      toast.error("Data booking tidak ditemukan.");
      return;
    }

    const updatedSpots = spots.map((s) =>
      s.id === booking.spotId ? { ...s, status: "tersedia" as const } : s
    );

    const updatedBookings = removeBookingById(bookingId);
    if (updatedBookings) {
      setSpots(updatedSpots);
      setBookings(updatedBookings);
      toast.success(
        `Sesi untuk spot ${booking?.spotNumber} berhasil di hapus.`
      );
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 py-8 space-y-10">
        <StatsCol spots={spots} bookings={bookings} />

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-2">
            <TabsTrigger value="map">Denah Parkir</TabsTrigger>
            <TabsTrigger value="bookings">
              Pemesanan ({bookings.length})
            </TabsTrigger>
          </TabsList>

          <TabContent
            spots={spots}
            bookings={bookings}
            handleEndSession={handleEndSession}
            handleRemoveSession={handleRemoveSession}
            handleSpotClick={handleSpotClick}
          />

          {isFormOpen && selectedSpot && (
            <BookingForm
              selectedSpot={selectedSpot}
              onSubmit={handleBookingSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedSpot(null);
              }}
            />
          )}
        </Tabs>
      </section>
    </main>
  );
};

export default Index;
