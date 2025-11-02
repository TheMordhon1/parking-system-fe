import type { Booking } from "@/types/parking";
import {
  calculateDurationInMinutes,
  calculateOvertimeMinutes,
  calculateRemainingTime,
  formatDuration,
} from "@/utils/timeFormat";
import {
  AlertTriangle,
  Calendar,
  Clock,
  LogOut,
  Tag,
  User,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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

    return () => clearInterval(interval);
  }, [booking.startTime, booking.duration]);

  const getTypeIcon = () => {
    switch (booking["type"]) {
      case "disabilitas":
        return "♿";
      case "listrik":
        return "🔋";
      case "valet":
        return "🧍🏻‍♂️";
      case "umum":
        return "🚗";
      default:
        return "";
    }
  };

  const overtimeMinutes = calculateOvertimeMinutes(
    booking.startTime,
    booking.duration
  );
  const isCompleted = booking.status === "completed";
  const isOvertime = overtimeMinutes > 0 && !isCompleted;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              Spot {booking.spotNumber}{" "}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              ID: {booking.id}
            </p>
          </div>
          <Badge
            variant={
              isOvertime ? "destructive" : isCompleted ? "success" : "default"
            }
          >
            {isOvertime ? "Overtime" : isCompleted ? "Selesai" : "Aktif"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-4 flex-1">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{booking.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">{booking.vehicleNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-4 w-4 flex justify-center items-center">
              {getTypeIcon()}
            </span>
            <span className="font-mono capitalize">{booking.type}</span>
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
          {booking.endTime && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <LogOut className="h-4 w-4 text-muted-foreground" />
                <span>Selesai: {moment(booking.endTime).format("hh.mm")}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  Durasi:{" "}
                  {formatDuration(
                    calculateDurationInMinutes(
                      booking.startTime,
                      booking?.endTime ?? new Date()
                    )
                  )}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="space-y-4">
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
          ) : isCompleted ? (
            <></>
          ) : (
            <div className="flex items-start gap-2 p-3 bg-blue-300/40 rounded-md">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  Waktu Tersisa
                </p>
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
            disabled={isCompleted}
          >
            Akhiri Sesi Parkir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
