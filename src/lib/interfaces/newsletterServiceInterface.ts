import type { ICreateNewsletterPayload } from "./createNewsletterPayloadInterface";

export interface INewsletterService {
	sendConfirmation: (payload: ICreateNewsletterPayload) => void;
	createSubscription: (payload: ICreateNewsletterPayload) => void;
	isAlreadySubscribed: (email: string) => Promise<boolean>;
	deactivateSubscription: (email: string) => void;
}