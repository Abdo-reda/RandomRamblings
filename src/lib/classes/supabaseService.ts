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

  async invokeCreateNewsletterSubscriptionAsync(
    payload: ICreateNewsletterPayload
  ) {
    try {
      await this.invokeFunctionPost(
        SupabaseFunctions.NEWSLETTER_CREATE_SUBSCRIPTION,
        payload
      );
    } catch (error) {
      console.log(
        "[SupabaseService]: Error invoking newsletter-create-subscription function",
        error
      );
    }
  }

  async isNewsletterEmailAlreadySubscribed(email: string): Promise<boolean> {
    // const { data, error } = await this.baseNewsletterUsersQuery().eq("name", "Albania");
    const { data, error } = await this.baseNewsletterUsersQuery()
    console.log('--- data', data);
    console.log('--- error', error);
    return false;
  }

  private baseNewsletterUsersQuery() {
    return this.supabase
      .from(SupabaseTables.USERS)
      .select(`
        *,
        ${SupabaseTables.NEWSLETTER_USERS} (
          *
        )
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
