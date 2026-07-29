import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { sanityClient, urlFor } from "../lib/sanity";
import SEO from "../../SEO";

const QUERY = `*[_type == "insight"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  category,
  coverImage,
  excerpt,
  publishedAt
}`;

const InsightsArchivePage = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(QUERY)
      .then((data) => setInsights(data))
      .catch((err) => console.error("Failed to load insights:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#FAF8F3] dark:bg-[#101826]">
      <SEO
        title="Insights"
        description="Legal insights and analysis from Lawzra LLP on issues across corporate, tax, energy, IP, and dispute resolution."
        canonical="/insights"
      />

      {/* Hero Section — unchanged from before */}
      <div
        style={{ backgroundImage: `url(${assets.aboutUs4})` }}
        className="relative mb-10 flex h-64 flex-col items-center justify-center bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-[#0A0F18]/60" />
        <div className="relative z-10 text-center">
          <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#C9A876]">
            <span className="h-px w-8 bg-[#C9A876]/60" />
            The Archive
            <span className="h-px w-8 bg-[#C9A876]/60" />
          </div>
          <h1 className="font-display text-center text-6xl font-medium text-white">
            Insights
          </h1>
          <p className="mt-2 px-4 text-center text-white/70">
            Learn from our deep perception on important legal issues happening
            around the globe.
          </p>
        </div>
      </div>

      {/* Insights Cards Container */}
      <div className="mx-auto mb-20 flex max-w-7xl flex-wrap items-stretch justify-center gap-8 px-6 pt-12">
        {loading && (
          <p className="text-[#4B5262] dark:text-white/60">Loading insights…</p>
        )}

        {!loading && insights.length === 0 && (
          <p className="text-[#4B5262] dark:text-white/60">
            No insights published yet — check back soon.
          </p>
        )}

        {insights.map((item) => (
          <Link
            key={item.slug}
            to={`/insights/${item.slug}`}
            className="flex w-full max-w-72 flex-col rounded-sm border border-[#C9A876]/20 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#C9A876] hover:shadow-xl dark:border-white/10 dark:bg-[#16223a] dark:hover:border-[#C9A876]"
          >
            {item.coverImage && (
              <img
                className="h-40 w-full rounded-sm object-cover"
                src={urlFor(item.coverImage).width(400).height(240).url()}
                alt={item.title}
                width={400}
                height={240}
                loading="lazy"
              />
            )}

            <div className="mt-4 flex items-center justify-between">
              <span className="font-docket rounded-sm bg-[#C9A876]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#B08D57] dark:bg-[#C9A876]/15 dark:text-[#C9A876]">
                {item.category}
              </span>
              <span className="text-[10px] font-normal text-[#4B5262]/70 dark:text-white/40">
                {new Date(item.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <h3 className="mt-3 font-display text-base text-[#101826] dark:text-white line-clamp-2">
              {item.title}
            </h3>

            <p className="mt-2 grow text-left text-sm text-[#4B5262] line-clamp-3 dark:text-white/70">
              {item.excerpt}
            </p>

            <div className="mt-4 border-t border-[#C9A876]/15 pt-4 dark:border-white/10">
              <span className="font-docket text-[11px] uppercase tracking-wide text-[#101826] hover:underline dark:text-white">
                Read Article →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InsightsArchivePage;
