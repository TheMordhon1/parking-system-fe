import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi").max(100, "Nama terlalu panjang"),
  vehicleNumber: z
    .string()
    .min(1, "Nomor kendaraan harus diisi")
    .max(20, "Nomor kendaraan terlalu panjang"),
  duration: z.number().min(15, "Minimal 15 menit").max(2880, "Maksimal 2 hari"),
});