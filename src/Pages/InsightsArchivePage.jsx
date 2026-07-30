import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { sanityClient, urlFor } from "../lib/sanity";
import { assets } from "../assets/assets";
import SEO from "../../SEO";

const PAGE_SIZE = 9;

const PAGINATED_QUERY = `*[_type == "insight"] | order(publishedAt desc) [$start...$end] {
  title, "slug": slug.current, category, coverImage, excerpt, publishedAt
}`;

const CATEGORIES_QUERY = `array::unique(*[_type == "insight"].category)`;

const buildFilteredQuery = (hasTerm, hasCategory) => {
  const conditions = ['_type == "insight"'];
  if (hasTerm) conditions.push("(title match $term || excerpt match $term)");
  if (hasCategory) conditions.push("category == $category");
  return `*[${conditions.join(" && ")}] | order(publishedAt desc) {
    title, "slug": slug.current, category, coverImage, excerpt, publishedAt
  }`;
};

const InsightsArchivePage = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);
  const [filtering, setFiltering] = useState(false);
  const debounceRef = useRef(null);

  const isFilterActive = searchTerm.trim() !== "" || activeCategory !== "All";

  const fetchPage = async (pageNumber) => {
    const start = pageNumber * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return sanityClient.fetch(PAGINATED_QUERY, { start, end });
  };

  // Initial load + categories list
  useEffect(() => {
    fetchPage(0)
      .then((batch) => {
        setInsights(batch);
        setHasMore(batch.length === PAGE_SIZE);
      })
      .catch((err) => console.error("Failed to load insights:", err))
      .finally(() => setLoading(false));

    sanityClient
      .fetch(CATEGORIES_QUERY)
      .then((cats) => setCategories(cats.filter(Boolean)))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const batch = await fetchPage(nextPage);
      setInsights((prev) => [...prev, ...batch]);
      setHasMore(batch.length === PAGE_SIZE);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more insights:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Debounced combined search + category filter
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!isFilterActive) {
      setFilteredResults(null);
      return;
    }

    setFiltering(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const hasTerm = searchTerm.trim() !== "";
        const hasCategory = activeCategory !== "All";
        const query = buildFilteredQuery(hasTerm, hasCategory);
        const params = {};
        if (hasTerm) params.term = `${searchTerm.trim()}*`;
        if (hasCategory) params.category = activeCategory;

        const results = await sanityClient.fetch(query, params);
        setFilteredResults(results);
      } catch (err) {
        console.error("Filter failed:", err);
        setFilteredResults([]);
      } finally {
        setFiltering(false);
      }
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, activeCategory]);

  const displayedInsights = isFilterActive ? (filteredResults ?? []) : insights;

  return (
    <div className="bg-[#FAF8F3] dark:bg-[#101826]">
      <SEO
        title="Insights"
        description="Legal insights and analysis from Lawzra LLP on issues across corporate, tax, energy, IP, and dispute resolution."
        canonical="/insights"
      />

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

      {/* Search */}
      <div className="mx-auto mb-6 max-w-md px-6">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5262]/50 dark:text-white/40"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search insights…"
            className="w-full rounded-sm border border-[#C9A876]/25 bg-white py-3 pl-11 pr-10 text-sm text-[#101826] outline-none transition focus:border-[#C9A876] dark:border-white/10 dark:bg-[#16223a] dark:text-white"
          />
          {searchTerm.trim() !== "" && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5262]/60 hover:text-[#101826] dark:text-white/40 dark:hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 0 && (
        <div className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-2 px-6">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                activeCategory === cat
                  ? "border-[#C9A876] bg-[#C9A876] text-[#101826]"
                  : "border-[#C9A876]/30 text-[#B08D57] hover:border-[#C9A876] dark:text-[#C9A876]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-stretch justify-center gap-8 px-6 pt-4">
        {(loading || (isFilterActive && filtering)) && (
          <p className="text-[#4B5262] dark:text-white/60">
            {isFilterActive ? "Filtering…" : "Loading insights…"}
          </p>
        )}

        {!loading && !filtering && displayedInsights.length === 0 && (
          <p className="text-[#4B5262] dark:text-white/60">
            {isFilterActive
              ? "No insights match your filters."
              : "No insights published yet — check back soon."}
          </p>
        )}

        {!filtering &&
          displayedInsights.map((item) => (
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

      {!isFilterActive && !loading && hasMore && (
        <div className="flex justify-center pb-20">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="rounded-sm border border-[#C9A876] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#B08D57] transition-colors hover:bg-[#C9A876] hover:text-[#101826] disabled:cursor-not-allowed disabled:opacity-60 dark:text-[#C9A876]"
          >
            {loadingMore ? "Loading…" : "Show More Insights"}
          </button>
        </div>
      )}
    </div>
  );
};

export default InsightsArchivePage;
