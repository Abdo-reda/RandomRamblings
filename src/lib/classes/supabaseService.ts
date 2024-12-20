import type { SupabaseClient } from "@supabase/supabase-js";
import type { ISupabaseService } from "../interfaces/supabaseServiceInterface";
import type { ICreateNewsletterPayload } from "../interfaces/createNewsletterPayloadInterface";
import type { FunctionsResponse } from "@supabase/functions-js";
import { SupabaseFunctions } from "../enums/supabaseFunctionsEnum";
import { SupabaseTables } from "../enums/supabaseTablesEnum";

type SupabaseFunctionBody =
  | File
  | Blob
  | ArrayBuffer
  | FormData
  | ReadableStream<Uint8Array>
  | Record<string, any>
  | string;

export class SupabaseService implements ISupabaseService {
  supabase: SupabaseClient<any, "public", any>;

  constructor(_supabase: SupabaseClient<any, "public", any>) {
    this.supabase = _supabase;
  }

  async invokeConfirmNewsletterAsync(payload: ICreateNewsletterPayload) {
    try {
      await this.invokeFunctionPost(
        SupabaseFunctions.NEWSLETTER_CONFIRM_EMAIL,
        payload
      );
    } catch (error) {
      console.log(
        "[SupabaseService]: Error invoking newsletter-confirm-email function",
        error
      );
    }
  }

  async createNewsletterSubscriptionAsync(payload: ICreateNewsletterPayload) {
    const { data: users, error: usersError } = await this.supabase
      .from(SupabaseTables.USERS)
      .upsert({ email: payload.email }, { onConflict: "email" })
      .select();

    if (!users?.length || usersError) {
      throw new Error("Unable to Upsert User.");
    }

    const user = users[0];
    const { data, error } = await this.supabase
      .from(SupabaseTables.NEWSLETTER_USERS)
      .upsert(
        {
          user_id: user.id,
          active: true,
          theme: payload.theme,
          notification: payload.notification,
        },
        { onConflict: "user_id" }
      )
      .select();

    if (!data?.length || error) {
      throw new Error("Unable to Upsert Newsletter Users.");
    }
  }

  async isNewsletterEmailAlreadySubscribed(email: string): Promise<boolean> {
    const { data } = await this.baseNewsletterUsersQuery()
      .eq("email", email)
      .eq("NewsletterUsers.active", true);
    return !!data?.length;
  }

  async deactivateSubscription(email: string) {
    const { data: user, error: userError } =
      await this.baseNewsletterUsersQuery().eq("email", email).single();

    if (userError || !user) {
      console.error(`Error fetching user with email ${email}:`, userError);
      return;
    }

    const { error } = await this.supabase
      .from(SupabaseTables.NEWSLETTER_USERS)
      .update({ active: false })
      .eq("user_id", user.id);

    if (error) {
      console.error(`Error updating newsletter user with email ${email}:`, userError);
      return;
    }
  }

  private baseNewsletterUsersQuery() {
    return this.supabase.from(SupabaseTables.USERS).select(`
        *,
        ${SupabaseTables.NEWSLETTER_USERS}!inner(*)
      `);
  }

  private invokeFunctionAsync<T = any>(
    name: SupabaseFunctions,
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE",
    body?: SupabaseFunctionBody
  ): Promise<FunctionsResponse<T>> {
    return this.supabase.functions.invoke<T>(name, {
      headers: {
        Authorization: `Bearer ${import.meta.env.SUPABASE_ANON_KEY}`,
      },
      method: method,
      body: body,
      // region:,// TODO: should I fix the region?
    });
  }

  private invokeFunctionGet<T = any>(
    name: SupabaseFunctions,
    body?: SupabaseFunctionBody
  ) {
    return this.invokeFunctionAsync<T>(name, "GET", body);
  }

  private invokeFunctionPost<T = any>(
    name: SupabaseFunctions,
    body?: SupabaseFunctionBody
  ) {
    return this.invokeFunctionAsync<T>(name, "POST", body);
  }
}
