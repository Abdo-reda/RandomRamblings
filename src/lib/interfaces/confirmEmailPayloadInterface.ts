import type { NotificationFrequency } from "../enums/notificationFrequencyEnum";

export interface IConfirmEmailPayload {
	email: string;
	notification: NotificationFrequency;
}