import { z } from "astro/zod";
import { NotificationFrequency } from "../enums/notificationFrequencyEnum";
import { Theme } from "../enums/themeEnum";

const emailSchema = z.string().email();
const notificationSchema = z.nativeEnum(NotificationFrequency);
const themeSchema = z.nativeEnum(Theme);

export function isValidEmail(email: string): boolean {
  const result = emailSchema.safeParse(email);
  return result.success;
}

export function isValidNotification(tag: string): boolean {
  const result = notificationSchema.safeParse(tag);
  return result.success;
}

export function isValidTheme(theme: string): boolean {
  const result = themeSchema.safeParse(theme);
  return result.success;
}
