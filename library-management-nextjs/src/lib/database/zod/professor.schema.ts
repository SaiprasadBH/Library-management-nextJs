import { z } from "zod";

export const ProfessorBaseSchema = z.object({
  name: z
    .string({ message: "Professor name must be a string." })
    .min(3, { message: "Name must be a minimum of 3 characters long." }),
  email: z
    .string({ message: "Email must be a string." })
    .email({ message: "Invalid email format." }),
  department: z
    .string({ message: "Department must be a string." })
    .nullable()
    .optional(), // nullable and optional to allow both null and undefined
  bio: z.string({ message: "Bio must be a string." }).nullable().optional(), // nullable and optional to allow both null and undefined
  calendlyLink: z
    .string({ message: "Calendly link must be a string." })
    .url({ message: "Invalid URL format." })
    .nullable()
    .optional(), // nullable and optional to allow both null and undefined
  wallet: z
    .number({ message: "Wallet must be a number." })
    .int({ message: "Wallet must be an integer." })
    .min(0, { message: "Wallet balance cannot be negative." }),
});

export const ProfessorSchema = ProfessorBaseSchema.extend({
  id: z.number().int().min(1, { message: "ID must be a positive integer." }),
});

export type IProfessorBase = z.infer<typeof ProfessorBaseSchema>;
export type IProfessor = z.infer<typeof ProfessorSchema>;
