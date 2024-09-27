import { z } from "zod";

export const ProfessorBaseSchema = z.object({
  name: z
    .string({ message: "Professor name must be a string." })
    .min(3, { message: "Name must be a minimum 3 characters long." }),
  email: z
    .string({ message: "Email must be a string." })
    .email({ message: "Invalid email format." }),
  department: z.string({ message: "Department must be a string." }).optional(),
  bio: z.string({ message: "Bio must be a string." }).optional(),
  calendlyLink: z
    .string({ message: "Calendly link must be a string." })
    .url({ message: "Invalid URL format." })
    .nullable(),
});

export const ProfessorSchema = ProfessorBaseSchema.extend({
  id: z.number().int().min(1),
});

export type IProfessorBase = z.input<typeof ProfessorBaseSchema>;
export type IProfessor = z.input<typeof ProfessorSchema>;
