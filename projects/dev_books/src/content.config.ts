import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const books = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/books" }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        img: z.string(),
        readtime: z.number(),
        description: z.string(),
        buy: z.object({
            spain: z.url(),
            usa: z.url(),
        }),
    }),
});

export const collections = { books };