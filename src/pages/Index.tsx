import Header from "@/Components/Header";
import { StatsCol } from "@/Components/container/StatsCol";
import TabContent from "@/Components/container/TabContent";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import type { Booking, ParkingSpot } from "@/types/parking";
import {
  generateMockBookings,
  generateMockParkingSpots,
} from "@/utils/mockData";
import { useEffect, useState } from "react";

const Index = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const spotMock = generateMockParkingSpots();
    const bookingsMock = generateMockBookings(spotMock);
    setSpots(spotMock);
    setBookings(bookingsMock);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 py-8 space-y-10">
        <StatsCol spots={spots} bookings={bookings} />

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-2">
            <TabsTrigger value="map">Denah Parkir</TabsTrigger>
            <TabsTrigger value="bookings">Pemesanan</TabsTrigger>
          </TabsList>

          <TabContent
            spots={spots}
            bookings={bookings}
            handleEndSession={() => {}}
          />
        </Tabs>
      </section>
    </main>
  );
};

export default Index;
