import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { NotificationFrequency } from "../../lib/enums/notificationFrequencyEnum";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const notification = new URL(request.url).searchParams.get("notification") || NotificationFrequency.WEEKLY;

  const currentDate = new Date();
  const prevMonth = (currentDate.getMonth() + 11)%12;
  currentDate.setDate(currentDate.getDate() - 7);
  currentDate.setHours(0, 0, 0, 0);

  const allPosts = (
    await getCollection("posts", ({ data }) => data.draft !== true)
  ).map((p) => p.data)
  .filter(p => {
    if (notification === NotificationFrequency.WEEKLY) {
      return p.date > currentDate;
    } else if (notification === NotificationFrequency.MONTHLY) {
      return p.date.getMonth() === prevMonth;
    }
  })
  .sort((a, b) => a.post-b.post);

  return new Response(
    JSON.stringify({
      posts: allPosts,
    })
  );
};
