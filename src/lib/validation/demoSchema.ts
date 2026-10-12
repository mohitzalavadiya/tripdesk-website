import { z } from 'zod';

export const demoRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name must be under 100 characters.' }),
  workEmail: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid work email address.' })
    .max(120, { message: 'Email address must be under 120 characters.' }),
  phone: z
    .string()
    .trim()
    .max(25, { message: 'Phone number is too long.' })
    .optional()
    .or(z.literal('')),
  agencyName: z
    .string()
    .trim()
    .min(2, { message: 'Agency or company name must be at least 2 characters.' })
    .max(120, { message: 'Agency name must be under 120 characters.' }),
  monthlyBookings: z
    .enum(['under_10', '10_to_50', '50_to_200', 'over_200'])
    .optional(),
  primaryRequirement: z
    .string()
    .trim()
    .max(1000, { message: 'Requirement note must be under 1000 characters.' })
    .optional()
    .or(z.literal('')),
  marketingConsent: z.boolean().optional(),
  // Anti-spam honeypot (must remain empty for legitimate human visitors)
  website: z.string().max(100).optional().or(z.literal('')),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string()
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(150),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(2000),
  // Anti-spam honeypot (must remain empty for legitimate human visitors)
  website: z.string().max(100).optional().or(z.literal('')),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
