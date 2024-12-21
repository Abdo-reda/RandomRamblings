import React from "npm:react@19.0.0";
import { render } from "npm:@react-email/components@0.0.31";
import { createClient } from "jsr:@supabase/supabase-js@2";
import jwt from "npm:jsonwebtoken@9.0.2";
import type { ISendNewsletterPayload } from "../../../src/lib/interfaces/sendNewsletterPayloadInterface.ts";
import type { IPost } from "../../../src/lib/interfaces/postInterface.ts";
import NewsletterEmail from "../_shared/email-templates/newsletter-email.tsx";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const JWT_SECRET = Deno.env.get("CUSTOM_JWT_SECRET");
const BASE_URL = 'https://random-ramblings.me';

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("not allowed", { status: 400 });
  }

  try {
    const payload: ISendNewsletterPayload = await req.json();
    const response = await fetch(
      `${BASE_URL}/api/posts-data.json?notification=${payload.notification}`
    );
    let { posts } = (await response.json()) as { posts: IPost[] };
    posts = posts.map((p) => {
      return {
        ...p,
        date: new Date(p.date),
      };
    });
    const notificationTitle = payload.notification.replace(/^\w/, (c) =>
      c.toUpperCase()
    );

    if (!posts.length) {
      return new Response(
        JSON.stringify({
          message: `No posts were created, no emails were sent.`,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { fiftyUsers: fiftyLightUsers, restUsers: restLightUsers } =
      await getUsers(payload.notification, "light");
    const { fiftyUsers: fiftyDarkUsers, restUsers: restDarkUsers } =
      await getUsers(payload.notification, "dark");

    console.log(
      "[newsletter-email]: Rest of Users that did not recieve emails",
      restLightUsers,
      restDarkUsers
    );

    const lightHtml = await render(
      React.createElement(NewsletterEmail, {
        theme: "light",
        posts: posts,
        notification: payload.notification,
      })
    );

    const darkHtml = await render(
      React.createElement(NewsletterEmail, {
        theme: "dark",
        posts: posts,
        notification: payload.notification,
      })
    );

    const text = await render(
      React.createElement(NewsletterEmail, {
        theme: "dark",
        posts: posts,
        notification: payload.notification,
      }),
      {
        plainText: true,
      }
    );

    await sendEmails(fiftyLightUsers, notificationTitle, lightHtml, text);
    await sendEmails(fiftyDarkUsers, notificationTitle, darkHtml, text);

    return new Response(
      JSON.stringify({
        message: `Successfully Sent Newsletter Emails to ${
          fiftyLightUsers.length + fiftyDarkUsers.length
        } out of ${
          restLightUsers.length +
          restDarkUsers.length +
          fiftyLightUsers.length +
          fiftyDarkUsers.length
        }`,
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
      "[newsletter--email] Error, maybe invalid json, email or maybe unable to reach resend ...",
      error
    );

    return new Response(
      JSON.stringify({ error: `An Error has occured. ${error?.message}` }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

async function getUsers(
  notification: string,
  theme: string
): Promise<{
  fiftyUsers: string[];
  restUsers: string[];
}> {
  const { data: users } = await supabaseClient
    .from("Users")
    .select(
      `
      *,
      NewsletterUsers!inner(*)
    `
    )
    .eq("NewsletterUsers.notification", notification)
    .eq("NewsletterUsers.theme", theme)
    .eq("NewsletterUsers.active", true);

  const userEmails = users.map((u) => u.email);
  const fiftyUsers = userEmails.slice(0, 5);
  const restUsers = userEmails.slice(5);

  return { fiftyUsers, restUsers };
}

async function sendEmails(
  users: any[],
  notificationTitle: string,
  html: string,
  text: string
) {
  for (let i = 0; i < users.length; i++) {
    const token = jwt.sign({
      email: users[i]
    }, JWT_SECRET)
    const newHtml = html.replace('PLACEHOLDER_TOKEN', token);
    const newText = text.replace('PLACEHOLDER_TOKEN', token);
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "nopoint@random-ramblings.me",
        to: users[i],
        subject: `${notificationTitle} Newlsetter`,
        html: newHtml,
        text: newText,
      }),
    });
  }
}

Deno.serve(handler);
