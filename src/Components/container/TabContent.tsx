import { TabsContent } from "../ui/tabs";

const TabContent = () => {
  return (
    <>
      <TabsContent value="map" className="mt-6 space-y-4">
        MAP
      </TabsContent>
      <TabsContent value="bookings" className="mt-6 space-y-4">
        BOOKING
      </TabsContent>
    </>
  );
};

export default TabContent;
