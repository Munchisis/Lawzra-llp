import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "lzt76ue8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const SITE_URL = "https://lawzra.com";

const STATIC_ROUTES = [
  "",
  "about-us",
  "contact-us",
  "our-team",
  "careers",
  "areas-of-practice",
  "insights",
  "privacy-policy",
  "terms-of-service",
  "cookie-policy",
];

// From practiceData.js — practiceAreasData slugs
const PRACTICE_AREA_SLUGS = [
  "banking",
  "corporate",
  "dispute",
  "ip",
  "privacy",
  "real-estate",
  "tax",
  "tech",
  "energy",
];

// From partnerData.js — partnerInfo slugs
const TEAM_SLUGS = ["uchenna-emmanuel", "macsunny-nwoke", "chigozie-kelechi"];

export default async function handler(req, res) {
  try {
    const insightSlugs = await client.fetch(
      `*[_type == "insight"].slug.current`,
    );

    const staticUrls = STATIC_ROUTES.map(
      (path) => `<url><loc>${SITE_URL}/${path}</loc></url>`,
    ).join("");

    const practiceUrls = PRACTICE_AREA_SLUGS.map(
      (slug) => `<url><loc>${SITE_URL}/areas-of-practice/${slug}</loc></url>`,
    ).join("");

    const teamUrls = TEAM_SLUGS.map(
      (slug) => `<url><loc>${SITE_URL}/our-team/${slug}</loc></url>`,
    ).join("");

    const insightUrls = insightSlugs
      .map((slug) => `<url><loc>${SITE_URL}/insights/${slug}</loc></url>`)
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${practiceUrls}
  ${teamUrls}
  ${insightUrls}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate",
    );
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
}
