import type { BookingFormData, ParkingSpot } from "@/types/parking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "./schema/bookingSchema";
import z from "zod";

interface BookingFormProps {
  selectedSpot: ParkingSpot;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

export const BookingForm = ({
  selectedSpot,
  onSubmit,
  onCancel,
}: BookingFormProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      vehicleNumber: "",
      duration: 120,
    },
  });
  useEffect(() => {
    if (selectedSpot) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedSpot]);

  const formatVehicleNumber = (value: string) => {
    const clean = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    // Split into prefix, digits, and suffix manually
    let prefix = clean.match(/^[A-Z]{0,2}/)?.[0] || "";
    let rest = clean.slice(prefix.length);

    let digits = rest.match(/^\d{0,4}/)?.[0] || "";
    rest = rest.slice(digits.length);

    let suffix = rest.match(/^[A-Z]{0,3}/)?.[0] || "";

    let formatted = prefix;
    if (digits) formatted += ` ${digits}`;
    if (suffix) formatted += ` ${suffix}`;
    return formatted.trim();
  };

  const durationOptions = [
    { value: 15, label: "15 menit" },
    { value: 30, label: "30 menit" },
    { value: 60, label: "1 jam" },
    { value: 90, label: "1.5 jam" },
    { value: 120, label: "2 jam" },
    { value: 180, label: "3 jam" },
    { value: 240, label: "4 jam" },
    { value: 300, label: "5 jam" },
    { value: 360, label: "6 jam" },
    { value: 420, label: "7 jam" },
    { value: 480, label: "8 jam" },
    { value: 540, label: "9 jam" },
    { value: 600, label: "10 jam" },
    { value: 660, label: "11 jam" },
    { value: 720, label: "12 jam" },
    { value: 1440, label: "1 hari" },
    { value: 2880, label: "2 hari" },
  ];

  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Pesan Tempat Parkir <br className="flex sm:hidden" />
            <span className="text-lg md:text-xl italic">
              "{selectedSpot.type}"
            </span>
          </DialogTitle>
          <DialogDescription>
            Spot:{" "}
            <span className="font-medium text-foreground">
              {selectedSpot.number}
            </span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama Anda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Kendaraan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="B 1234 XYZ"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatVehicleNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Durasi Parkir</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[30vh] overflow-auto">
                      {durationOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value.toString()}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                Konfirmasi Pemesanan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
