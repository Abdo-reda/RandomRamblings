import type { SupabaseClient } from "@supabase/supabase-js";
import type { ISupabaseService } from "../interfaces/supabaseServiceInterface";
import type { IConfirmEmailPayload } from "../interfaces/confirmEmailPayloadInterface";
import type { FunctionsResponse } from "@supabase/functions-js";
import { SupabaseFunctions } from "../enums/supabaseFunctionsEnum";

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

  async invokeConfirmNewsletter(payload: IConfirmEmailPayload) {
    console.log("--- invoke edge method", payload);
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

  async invokeCreateNewsletterSubscription() {
    console.log("--- invoking create subscription");
    try {
      await this.invokeFunctionPost(
        SupabaseFunctions.NEWSLETTER_CREATE_SUBSCRIPTION
      );
    } catch (error) {
      console.log(
        "[SupabaseService]: Error invoking newsletter-create-subscription function",
        error
      );
    }
  }

  isNewsletterEmailAlreadySubscribed(email: string): boolean {
    return false;
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
