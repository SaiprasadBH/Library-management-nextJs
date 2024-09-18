import { string, z } from "zod";

export const MemberBaseSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(3, { message: "Name must be atleast 3 characters long." }),
  age: z
    .number({ message: "Age must be a number." })
    .int()
    .min(5, { message: "Member must be atleast 5 years old." })
    .max(100, { message: "Member cannot live that long." }),
  email: z.string(),
  address: z.string().min(5, {
    message: "Address is too short, must be of minimum 5 characters long.",
  }),
  password: z
    .string()
    .min(8)
    .refine(
      (value) => {
        return /[A-Z]/.test(value);
      },
      {
        message: "Password must contain at least one uppercase letter",
      }
    )
    .refine(
      (value) => {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value); // Ensure at least one special character
      },
      {
        message: "Password must contain at least one special character",
      }
    ),
  role: z.enum(["user", "admin"]),
});

export const MemberSchema = MemberBaseSchema.extend({
  id: z.number().int().min(1),
});

export type IMemberBase = z.input<typeof MemberBaseSchema>;
export type IMember = z.input<typeof MemberSchema>;
