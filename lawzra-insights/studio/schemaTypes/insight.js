export default {
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() },
    { name: "category", title: "Category", type: "string" },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "publishedAt", title: "Published At", type: "datetime", initialValue: () => new Date().toISOString() },
  ],
};