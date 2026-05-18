import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essays = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/essays" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    pillar: z.enum([
      "intent-gap",
      "founder-journey",
      "category-creation",
      "builder-notes",
    ]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { essays };
