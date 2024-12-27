import { Onyx } from "@/template/Onyx/Onyx";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTemplate = (template: string) => {
  switch (template) {
    case "onyx": {
      return Onyx;
    }

    default: {
      return Onyx;
    }
  }
};

export const generateId = () => {
  return Math.floor(Math.random() * 1000001);
};


