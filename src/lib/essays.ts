import { getCollection, type CollectionEntry } from "astro:content";

export type Essay = CollectionEntry<"essays">;

export const PILLAR_LABELS: Record<Essay["data"]["pillar"], string> = {
  "intent-gap": "The Intent Gap",
  "founder-journey": "Founder Journey",
  "category-creation": "Category Creation",
  "builder-notes": "Builder Notes",
};

export function essaySlug(entry: Essay): string {
  return entry.data.slug ?? entry.id;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Drafts are visible in `astro dev`, hidden in the production build.
export async function getPublishedEssays(): Promise<Essay[]> {
  const all = await getCollection("essays");
  const visible = import.meta.env.PROD
    ? all.filter((e) => !e.data.draft)
    : all;
  return visible.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
