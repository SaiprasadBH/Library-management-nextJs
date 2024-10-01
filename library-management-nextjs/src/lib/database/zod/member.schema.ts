import { z } from "zod";

export const MemberBaseSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(3, { message: "Name must be at least 3 characters long." }),
  age: z
    .number({ message: "Age must be a number." })
    .int()
    .min(5, { message: "Member must be at least 5 years old." })
    .max(100, { message: "Member cannot live that long." }),
  email: z
    .string({ message: "Email must be a string." })
    .email({ message: "Invalid email address." }),
  address: z
    .string()
    .min(2, {
      message: "Address is too short, must be at least 2 characters long.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
  wallet: z.number({ message: "Wallet must be a number." }).int().min(0, {
    message: "Wallet balance cannot be negative.",
  }),
  role: z.enum(["user", "admin"], {
    message: "Role must be either 'user' or 'admin'.",
  }),
});

export const MemberSchema = MemberBaseSchema.extend({
  id: z.number().int().min(1, { message: "ID must be a positive integer." }),
});

export type IMemberBase = z.infer<typeof MemberBaseSchema>;
export type IMember = z.infer<typeof MemberSchema>;
