import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import type { IConfirmEmailPayload } from "../../../src/lib/interfaces/confirmEmailPayloadInterface";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const handler = async (_request: Request): Promise<Response> => {
  // console.log('--- payload', payload);

  try {
    const payload: IConfirmEmailPayload = await _request.json();

    console.log("[newsletter-confirm-email] Parsed payload:", payload);

    // const res = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${RESEND_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     from: "onboarding@resend.dev", //who the fuck? and where?
    //     to: "3bdo.reda@gmail.com", //payload.email
    //     subject: "Newlsetter Confirmation",
    //     html: "<strong>it works!</strong>", //where and from who? local template?
    //   }),
    // });

    // const data = await res.json();

    return new Response(
      JSON.stringify({
        message: `Successfully Sent Confirmation Email to ${payload.email}`,
        // data: data,
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
      "[newsletter-confirm-email] Error, maybe invalid json or unable to reach resend",
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
