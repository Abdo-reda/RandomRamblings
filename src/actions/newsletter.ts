import { ActionError, defineAction } from "astro:actions";
import { supabaseNewsletterService } from "../lib/clients/supabase";
import type { INewsletterService } from "../lib/interfaces/newsletterServiceInterface";
import { ValidationCreateNewsletterPayload, ValidationDeleteNewsletterPayload } from "../lib/validations/createNewsletterPayloadValidation";

const newsLetterService: INewsletterService = supabaseNewsletterService;

export const newsletter = {
  createSubscription: defineAction({
    input: ValidationCreateNewsletterPayload,
    handler: async (input) => {
      await newsLetterService.createSubscription(input);
    },
  }),
  deactivateSubscription: defineAction({
    input: ValidationDeleteNewsletterPayload,
    handler: async (input) => {
      await newsLetterService.deactivateSubscription(input.email);
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
