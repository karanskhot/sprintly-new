import { clsx, type ClassValue } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

interface IApiResponseObject<T> {
  message: string;
  success: boolean;
  response: T | null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generic function
export const apiResponseObject = <T>({
  message,
  success,
  response
}: IApiResponseObject<T>) => {
  return {
    message,
    success,
    response
  };
};

export type DateCard = {
  date: string; // e.g. "Jul 16"
  day: string; // e.g. "Tuesday"
  fullDate: string; // full ISO date
  time_full: string;
  isToday: boolean;
};

export function getDateRange(
  start: Date,
  end: Date,
  userTz: string
): DateCard[] {
  const startDate = DateTime.fromJSDate(start, { zone: 'utc' }).setZone(userTz);
  const endDate = DateTime.fromJSDate(end, { zone: 'utc' }).setZone(userTz);

  const days: DateCard[] = [];
  let current = startDate;
  const today = DateTime.now().setZone(userTz).startOf('day');

  while (current <= endDate) {
    days.push({
      date: current.toFormat('MMM dd'),
      time_full: current.toString(),
      day: current.toFormat('cccc'),
      fullDate: current.toISODate()!,
      isToday: current.hasSame(today, 'day')
    });

    current = current.plus({ days: 1 });
  }

  return days;
}
