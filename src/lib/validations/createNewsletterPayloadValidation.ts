import { z } from "astro:schema";
import { NotificationFrequency } from "../enums/notificationFrequencyEnum";
import { Theme } from "../enums/themeEnum";

export const ValidationCreateNewsletterPayload = z.object({
  email: z.string(),
  notification: z.nativeEnum(NotificationFrequency),
  theme: z.nativeEnum(Theme),
});
