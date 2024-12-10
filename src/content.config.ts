import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { Tag } from "./lib/enums/tagEnum";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
	post: z.number(),
	draft: z.boolean(),
    title: z.string(),
    author: z.string(),
    date: z.date(),
    tags: z.array(z.nativeEnum(Tag)),
    image: z.object({
      alt: z.string(),
    }),
  }),
});

export const collections = { posts };
