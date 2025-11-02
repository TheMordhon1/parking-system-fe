import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Search, Filter } from "lucide-react";

interface ParkingFilterProps {
  statusFilter: string;
  typeFilter: string;
  searchQuery: string;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  availableCount: number;
  occupiedCount: number;
}

export const ParkingFilter = ({
  statusFilter,
  typeFilter,
  searchQuery,
  onStatusChange,
  onTypeChange,
  onSearchChange,
  availableCount,
  occupiedCount,
}: ParkingFilterProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filter & Pencarian</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Cari Nomor Spot</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Contoh: A1, A10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="tersedia">
                  Tersedia ({availableCount})
                </SelectItem>
                <SelectItem value="terisi">Terisi ({occupiedCount})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipe Spot</Label>
            <Select value={typeFilter} onValueChange={onTypeChange}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="umum">🚗 Umum</SelectItem>
                <SelectItem value="disabilitas">♿ Disabilitas</SelectItem>
                <SelectItem value="listrik">⚡ Listrik</SelectItem>
                <SelectItem value="valet">🧍🏻‍♂️ Valet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(statusFilter !== "all" || typeFilter !== "all" || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Filter aktif:</span>
            {statusFilter !== "all" && (
              <Badge variant="secondary">Status: {statusFilter}</Badge>
            )}
            {typeFilter !== "all" && (
              <Badge variant="secondary">Tipe: {typeFilter}</Badge>
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
