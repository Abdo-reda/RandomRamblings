import type { SupabaseClient } from "@supabase/supabase-js";
import type { IConfirmEmailPayload } from "./confirmEmailPayloadInterface";

export interface ISupabaseService {
	supabase: SupabaseClient<any, "public", any>;
	invokeConfirmNewsletter: (payload: IConfirmEmailPayload) => void;
	invokeCreateNewsletterSubscription: () => void;
	isNewsletterEmailAlreadySubscribed: (email: string) => boolean;
}