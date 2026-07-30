import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "../lib/sanity";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Linkedin, MessageCircle } from "lucide-react";

const SITE_URL = "https://lawzra.com";

const QUERY = `*[_type == "insight" && slug.current == $slug][0]{
  title, category, coverImage, excerpt, body, publishedAt, _updatedAt, "slug": slug.current,
  "related": *[_type == "insight" && slug.current != $slug && category == ^.category] 
    | order(publishedAt desc) [0...3] {
      title, "slug": slug.current, coverImage, excerpt, publishedAt
    }
}`;

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-display text-2xl font-medium text-[#101826] dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-display text-xl font-medium text-[#101826] dark:text-white">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed pl-1">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed pl-1">{children}</li>
    ),
  },
};

const WORDS_PER_MINUTE = 200;

const estimateReadingTime = (body) => {
  if (!Array.isArray(body)) return null;

  const wordCount = body
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .flatMap((block) => block.children)
    .map((span) => span.text || "")
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (wordCount === 0) return null;

  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};

const InsightDetailsPage = () => {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(QUERY, { slug })
      .then(setInsight)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return null;

  if (!insight) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F3] dark:bg-[#101826]">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h2 className="font-display text-2xl text-[#101826] dark:text-white mb-4">
          Insight Not Found
        </h2>
        <Link to="/insights" className="text-[#C9A876] hover:underline">
          Back to Insights
        </Link>
      </div>
    );
  }

  const canonicalUrl = `${SITE_URL}/insights/${insight.slug}`;
  const imageUrl = insight.coverImage
    ? urlFor(insight.coverImage).width(1200).height(630).url()
    : undefined;
  const readingTime = estimateReadingTime(insight.body);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: insight.publishedAt,
    dateModified: insight._updatedAt || insight.publishedAt,
    author: { "@type": "Organization", name: "Lawzra LLP", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Lawzra LLP",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.avif` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const shareText = encodeURIComponent(insight.title);
  const shareUrl = encodeURIComponent(canonicalUrl);

  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-16 dark:bg-[#101826] pt-12">
      <Helmet>
        <title>{insight.title} | Lawzra LLP</title>
        <meta name="description" content={insight.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={insight.title} />
        <meta property="og:description" content={insight.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={insight.title} />
        <meta name="twitter:description" content={insight.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          to="/insights"
          className="font-docket flex items-center gap-2 text-xs uppercase tracking-widest text-[#B08D57] hover:text-[#101826] dark:text-[#C9A876] mb-8"
        >
          <ArrowLeft size={14} /> All Insights
        </Link>

        {insight.coverImage && (
          <img
            src={urlFor(insight.coverImage).width(1200).height(600).url()}
            alt={insight.title}
            width={1200}
            height={600}
            className="w-full h-auto rounded-sm mb-8 object-cover"
          />
        )}

        <span className="font-docket rounded-sm bg-[#C9A876]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#B08D57] dark:bg-[#C9A876]/15 dark:text-[#C9A876]">
          {insight.category}
        </span>

        <h1 className="font-display text-3xl sm:text-4xl text-[#101826] dark:text-white mt-4 mb-4">
          {insight.title}
        </h1>

        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-[#4B5262]/70 dark:text-white/40">
            {new Date(insight.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {readingTime && <span> · {readingTime} min read</span>}
          </p>

          {/* Share buttons */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-[#4B5262]/60 dark:text-white/40">
              Share
            </span>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="text-[#4B5262] hover:text-[#B08D57] dark:text-white/50 dark:hover:text-[#C9A876] transition-colors"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="text-[#4B5262] hover:text-[#B08D57] dark:text-white/50 dark:hover:text-[#C9A876] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="text-[#4B5262] hover:text-[#B08D57] dark:text-white/50 dark:hover:text-[#C9A876] transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div className="max-w-none text-[#4B5262] dark:text-white/75">
          <PortableText
            value={insight.body}
            components={portableTextComponents}
          />
        </div>

        {/* Related Articles */}
        {insight.related?.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#C9A876]/15 dark:border-white/10">
            <h2 className="font-display text-xl text-[#101826] dark:text-white mb-6">
              Related Insights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {insight.related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/insights/${item.slug}`}
                  className="flex flex-col rounded-sm border border-[#C9A876]/20 bg-white p-3 transition hover:border-[#C9A876] hover:shadow-lg dark:border-white/10 dark:bg-[#16223a]"
                >
                  {item.coverImage && (
                    <img
                      src={urlFor(item.coverImage).width(300).height(180).url()}
                      alt={item.title}
                      width={300}
                      height={180}
                      loading="lazy"
                      className="h-28 w-full rounded-sm object-cover mb-3"
                    />
                  )}
                  <h3 className="font-display text-sm text-[#101826] dark:text-white line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightDetailsPage;
