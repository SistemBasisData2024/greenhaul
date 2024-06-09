import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (email = "") =>
  !!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

const dayNames = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/**
 * Formats a JavaScript Date object into a string in the format:
 * "Senin, 12 Maret 2024".
 *
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new TypeError("Invalid date, must be a JavaScript Date object");
  }

  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${dayName}, ${day} ${monthName} ${year} — ${hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}

const padZero = (num) => num.toString().padStart(2, "0");

/**
 * Formats a JavaScript Date object into a PostgreSQL timestamp string:
 * "YYYY-MM-DD HH:MM:SS".
 *
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted timestamp string.
 */
export function formatToPostgresTimestamp(date) {
  if (!(date instanceof Date)) {
    throw new TypeError("Invalid date, must be a JavaScript Date object");
  }

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are 0-based
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
