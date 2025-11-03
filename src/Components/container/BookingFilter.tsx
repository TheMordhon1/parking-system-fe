import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";

interface BookingFilterProps {
  statusFilter: string;
  searchQuery: string;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  activeCount: number;
  completedCount: number;
  overtimeCount: number;
}

export const BookingFilter = ({
  statusFilter,
  searchQuery,
  onStatusChange,
  onSearchChange,
  activeCount,
  completedCount,
  overtimeCount,
}: BookingFilterProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filter & Pencarian</h3>
        </div>

        <div className="flex items-center gap-4 flex-col sm:flex-row">
          {/* Search */}
          <div className="space-y-2 w-full">
            <Label htmlFor="booking-search">Cari Pemesanan</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="booking-search"
                placeholder="Nama, nomor kendaraan, atau spot"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="booking-status">Status</Label>
            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger id="booking-status" className="w-full">
                <SelectValue placeholder="Semua Status" className="w-full" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif ({activeCount})</SelectItem>
                <SelectItem value="completed">
                  Selesai ({completedCount})
                </SelectItem>
                <SelectItem value="overtime">
                  Overtime ({overtimeCount})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(statusFilter !== "all" || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Filter aktif:</span>
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="capitalize">
                Status:{" "}
                {statusFilter === "active"
                  ? "aktif"
                  : statusFilter === "completed"
                  ? "selesai"
                  : "overtime"}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary">Pencarian: {searchQuery}</Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
