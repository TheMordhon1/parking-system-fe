import type { Booking } from "@/types/parking";
import {
  calculateOvertimeMinutes,
  calculateRemainingTime,
  formatDuration,
} from "@/utils/timeFormat";
import { AlertTriangle, Calendar, Car, Clock, User } from "lucide-react";
import moment from "moment";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

interface BookingCardProps {
  booking: Booking;
  onEndSession: (bookingId: string) => void;
}

export const BookingCard = ({ booking, onEndSession }: BookingCardProps) => {
  const [remainingMinutes, setRemainingTime] = useState(
    calculateRemainingTime(booking.startTime, booking.duration)
  );

  // update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(
        calculateRemainingTime(booking.startTime, booking.duration)
      );
    }, 60000);

    return clearInterval(interval);
  }, [booking.startTime, booking.duration]);

  const overtimeMinutes = calculateOvertimeMinutes(
    booking.startTime,
    booking.duration
  );
  const isOvertime = overtimeMinutes > 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Spot {booking.spotNumber}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              ID: {booking.id}
            </p>
          </div>
          <Badge variant={isOvertime ? "destructive" : "default"}>
            {isOvertime ? "Overtime" : "Aktif"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{booking.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">{booking.vehicleNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{moment(booking.startTime).format("D MMMM YYYY")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              Mulai: {moment(booking.startTime).format("hh.mm")} (
              {formatDuration(booking.duration)})
            </span>
          </div>
        </div>

        {isOvertime ? (
          <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-md">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Overtime</p>
              <p className="text-xs text-destructive/80">
                Melebihi {formatDuration(overtimeMinutes)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 bg-blue-300/40 rounded-md">
            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">Waktu Tersisa</p>
              <p className="text-xs text-primary/80">
                {formatDuration(remainingMinutes)}
              </p>
            </div>
          </div>
        )}

        <Button
          variant={isOvertime ? "destructive" : "outline"}
          className="w-full"
          onClick={() => onEndSession(booking.id)}
        >
          Akhiri Sesi Parkir
        </Button>
      </CardContent>
    </Card>
  );
};
