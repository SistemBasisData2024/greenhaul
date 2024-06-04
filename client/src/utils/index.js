import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (email = "") =>
  !!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
