import { ActionError, defineAction } from "astro:actions";
import { supabaseNewsletterService } from "../lib/clients/supabase";
import type { INewsletterService } from "../lib/interfaces/newsletterServiceInterface";
import { ValidationCreateNewsletterPayload } from "../lib/validations/createNewsletterPayloadValidation";

const newsLetterService: INewsletterService = supabaseNewsletterService;

export const newsletter = {
  createSubscription: defineAction({
    input: ValidationCreateNewsletterPayload,
    handler: async (input) => {
      await newsLetterService.createSubscription(input);
    },
  }),
  sendConfirmation: defineAction({
    accept: "form",
    input: ValidationCreateNewsletterPayload,
    handler: async (input) => {
      if (await newsLetterService.isAlreadySubscribed(input.email)) {
        throw new ActionError({
          code: "CONFLICT",
          message: "Email is already registered",
        });
      }
      await newsLetterService.sendConfirmation(input);
    },
  }),
};
