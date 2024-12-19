import React from "npm:react@19.0.0";
import jwt from "npm:jsonwebtoken@9.0.2";
import { render } from "npm:@react-email/components@0.0.31";
import { NewsletterConfirmationEmail } from "../_shared/email-templates/newsletter-confirm-email.tsx";
import type { ICreateNewsletterPayload } from "../../../src/lib/interfaces/createNewsletterPayloadInterface.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const JWT_SECRET = Deno.env.get("CUSTOM_JWT_SECRET");

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("not allowed", { status: 400 });
  }

  try {
    const payload: ICreateNewsletterPayload = await req.json();

    let token = jwt.sign(payload, JWT_SECRET)

    const html = await render(
      React.createElement(NewsletterConfirmationEmail, {
        theme: payload.theme,
        token: token,
      })
    );

    const text = await render(
      React.createElement(NewsletterConfirmationEmail, {
        theme: payload.theme,
        token: token,
      })
      ,
      {
        plainText: true,
      }
    );

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "nopoint@random-ramblings.me",
        to: payload.email,
        subject: "Newlsetter Confirmation",
        html: html, 
        text: text,
      }),
    });

    return new Response(
      JSON.stringify({
        message: `Successfully Sent Confirmation Email to ${payload.email}`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "[newsletter-confirm-email] Error, maybe invalid json, email or maybe unable to reach resend ...",
      error
    );

    return new Response(
      JSON.stringify({ error: "Invalid or missing JSON payload" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

Deno.serve(handler);
