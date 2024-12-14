import type { ICreateNewsletterPayload } from "../interfaces/createNewsletterPayloadInterface";
import type { INewsletterService } from "../interfaces/newsletterServiceInterface";
import type { ISupabaseService } from "../interfaces/supabaseServiceInterface";

export class SupabaseNewsletterService implements INewsletterService {
  private supabaseService: ISupabaseService;

  constructor(_supabaseService: ISupabaseService) {
    this.supabaseService = _supabaseService;
  }

  async sendConfirmation(payload: ICreateNewsletterPayload) {
    await this.supabaseService.invokeConfirmNewsletterAsync(payload);
  }

  async createSubscription(payload: ICreateNewsletterPayload) {
    await this.supabaseService.invokeCreateNewsletterSubscriptionAsync(payload);
  }

  async isAlreadySubscribed(email: string): Promise<boolean> {
   	return this.supabaseService.isNewsletterEmailAlreadySubscribed(email);
  }
}
