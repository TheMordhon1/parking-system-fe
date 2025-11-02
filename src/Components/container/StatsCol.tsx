import type { ParkingSpot, Booking } from "../../types/parking";
import { Car, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface StatsProps {
  spots: ParkingSpot[];
  bookings: Booking[];
}

export const StatsCol = ({ spots, bookings }: StatsProps) => {
  const totalSpots = spots.length;
  const availableSpots = spots.filter((s) => s.status === "available").length;
  const occupiedSpots = spots.filter((s) => s.status === "occupied").length;
  const activeBookings = bookings.filter((b) => b.status === "active").length;

  const stats = [
    {
      label: "Total Spot",
      value: totalSpots,
      icon: Car,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Tersedia",
      value: availableSpots,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Terisi",
      value: occupiedSpots,
      icon: XCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      label: "Aktif",
      value: activeBookings,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="px-6 py-2">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
