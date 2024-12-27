import { z } from "zod";

export const PersonalDetailsSchema = z.object({
  photo: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email Required" }),
  headline: z.string(),
  phone: z.string(),
  location: z.string(),
});

export const EducationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  institution: z.string({ required_error: "Institution is required" }),
  studyType: z.string(),
  area: z.string({ required_error: "LastName is required" }),
  date: z.string(),
  summary: z.string(),
  url: z.object({
    label: z.string().default(""),
    href: z.string().default(""),
  }),
});

export const LanguageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string({ required_error: "description is required" }),
  level: z.string({ required_error: "Level is required" }),
});
export const SkillsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string({ required_error: "description is required" }),
  level: z.string({ required_error: "Level is required" }),
});

export const WorkExperienceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  position: z.string(),
  location: z.string(),
  company: z.string(),
  date: z.string(),
  summary: z.string(),
  url: z.object({
    label: z.string().default(""),
    href: z.string().default(""),
  }),
});
