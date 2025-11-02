import type { Booking, ParkingSpot } from "@/types/parking";
import { TabsContent } from "../ui/tabs";
import { BookingCard } from "../BookingCard";
import { ParkingMap } from "./ParkingSpot";

interface TabContentProps {
  spots: ParkingSpot[];
  bookings: Booking[];
  handleEndSession: (bookingId: string) => void;
  handleSpotClick: (spot: ParkingSpot) => void;
}

const TabContent = ({
  spots,
  bookings,
  handleSpotClick,
  handleEndSession,
}: TabContentProps) => {
  return (
    <>
      <TabsContent value="map" className="mt-6 space-y-4">
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Denah Parkiran
            </h2>
            <p className="text-sm text-muted-foreground">
              {spots.length === spots.length
                ? "Klik pada spot yang tersedia untuk memesan"
                : `Menampilkan ${spots.length} dari ${spots.length} spot`}
            </p>
          </div>
          <ParkingMap spots={spots} onSpotClick={handleSpotClick} />
        </div>
      </TabsContent>
      <TabsContent value="bookings" className="mt-6 space-y-4">
        {bookings.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onEndSession={handleEndSession}
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
