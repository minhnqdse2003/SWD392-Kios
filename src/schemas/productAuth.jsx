import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required and must have at least 1 character"),
  description: z
    .string()
    .trim()
    .min(1, "description is required and must have at least 8 character"),
  status: z.boolean().optional(),
  price: z.coerce.number().min(1, "Price is required and must have at least 1"),
  category: z
    .string()
    .trim()
    .min(1, "Category is required and must have at least 1"),
});
