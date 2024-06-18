import { object, z } from "zod";

export const addUserSchema = object({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
  binId: z.string().min(5, { message: "Bin Id must be at least 5 characters" }),
  bankAccountName: z
    .string()
    .min(5, { message: "Bank Account Name must be at least 5 characters" }),
  bankAccountNumber: z
    .string()
    .min(5, { message: "Bank Account Number must be at least 5 characters" }),
  bankName: z
    .string()
    .min(5, { message: "Bank Name must be at least 5 characters" }),
  email: z.string().email("This is not a valid email."),
});
