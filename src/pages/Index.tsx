import Header from "@/Components/Header";
import { Stats } from "@/Components/StatsCol";
import type { Booking, ParkingSpot } from "@/types/parking";
import { useState } from "react";

const Index = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 py-8">
        <Stats spots={spots} bookings={bookings} />
      </section>
    </main>
  );
};

export default Index;
