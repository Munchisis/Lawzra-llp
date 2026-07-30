import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "../lib/sanity";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const SITE_URL = "https://lawzra.com";

const QUERY = `*[_type == "insight" && slug.current == $slug][0]{
  title, category, coverImage, excerpt, body, publishedAt, "slug": slug.current
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

  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-16 dark:bg-[#101826] pt-12">
      <Helmet>
        <title>{insight.title} | Lawzra LLP</title>
        <meta name="description" content={insight.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={insight.title} />
        <meta property="og:description" content={insight.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
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

        <h1 className="font-display text-3xl sm:text-4xl text-[#101826] dark:text-white mb-4">
          {insight.title}
        </h1>

        <p className="text-xs text-[#4B5262]/70 dark:text-white/40 mb-8">
          {new Date(insight.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="max-w-none text-[#4B5262] dark:text-white/75">
          <PortableText
            value={insight.body}
            components={portableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default InsightDetailsPage;
