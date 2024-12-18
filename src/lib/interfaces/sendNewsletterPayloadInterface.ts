import type { NotificationFrequency } from "../enums/notificationFrequencyEnum";

export interface ISendNewsletterPayload {
	notification: NotificationFrequency;
}