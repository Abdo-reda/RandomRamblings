import type { SupabaseClient } from "@supabase/supabase-js";
import type { ICreateNewsletterPayload } from "./createNewsletterPayloadInterface";

export interface ISupabaseService {
	supabase: SupabaseClient<any, "public", any>;
	invokeConfirmNewsletterAsync: (payload: ICreateNewsletterPayload) => void;
	createNewsletterSubscriptionAsync: (payload: ICreateNewsletterPayload) => void;
	isNewsletterEmailAlreadySubscribed: (email: string) => Promise<boolean>;
}