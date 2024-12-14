import type { NotificationFrequency } from "../enums/notificationFrequencyEnum";
import type { Theme } from "../enums/themeEnum";

export interface ICreateNewsletterPayload {
	email: string;
	notification: NotificationFrequency;
	theme: Theme;
}