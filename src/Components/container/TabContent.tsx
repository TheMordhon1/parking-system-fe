import type { Booking, ParkingSpot } from "@/types/parking";
import { TabsContent } from "../ui/tabs";
import { BookingCard } from "../BookingCard";

interface TabContentProps {
  spots: ParkingSpot[];
  bookings: Booking[];
  handleEndSession: (bookingId: string) => void;
}

const TabContent = ({ spots, bookings, handleEndSession }: TabContentProps) => {
  return (
    <>
      <TabsContent value="map" className="mt-6 space-y-4">
        MAP
      </TabsContent>
      <TabsContent value="bookings" className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onEndSession={handleEndSession}
            />
          ))}
        </div>
      </TabsContent>
    </>
  );
};

export default TabContent;
