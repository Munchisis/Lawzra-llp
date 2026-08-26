import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { assets } from "../../assets/assets";
import HeroImageSlideshow from "../HeroImageSlideshow";

const SITE_URL = "https://lawzra.com";

// One entry per slideshow frame — each needs its own real description,
// not a shared generic caption, so search engines and screen readers
// get accurate context for every image.
const heroImages = [
  {
    src: assets.hero,
    alt: "Lawzra LLP attorneys reviewing case documents during a client consultation",
  },
  {
    src: assets.hero2,
    alt: "Lawzra LLP legal team in a strategy meeting ahead of a corporate filing",
  },
  {
    src: assets.hero3,
    alt: "A Lawzra LLP partner advising a client at the firm's Nigeria office",
  },
];

const Hero = () => {
  const clientAvatars = [
    {
      src: assets.profile,
      alt: "Portrait of a Lawzra LLP client, corporate advisory",
    },
    {
      src: assets.profile1,
      alt: "Portrait of a Lawzra LLP client, dispute resolution",
    },
    {
      src: assets.profile2,
      alt: "Portrait of a Lawzra LLP client, property law",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Lawzra LLP",
    url: SITE_URL,
    areaServed: "NG",
    description:
      "Lawzra LLP provides legal representation across corporate advisory, property disputes, tax, energy, IP, and dispute resolution.",
    memberOf: {
      "@type": "Organization",
      name: "Nigerian Bar Association",
    },
  };

  return (
    <section
      aria-label="Introduction to Lawzra LLP"
      className="relative overflow-hidden bg-[#101826] text-white"
    >
      {/* Structured data lives with the section it describes, so it stays
          in sync if this hero is ever reused on another page. If your
          Home page already renders an <SEO>/<Helmet> with LegalService
          data, remove one copy to avoid duplicate JSON-LD blocks. */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={heroImages[0].src}
          fetchpriority="high"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 10%, rgba(176,141,87,0.10) 0%, rgba(16,24,38,0) 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "100% 44px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Left: copy */}
        <m.div variants={container} initial="hidden" animate="show">
          <m.div
            variants={item}
            className="font-docket flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-assent"
          >
            <span className="h-px w-8 bg-assent/60" />
            File Ref — LZ / General Practice · Est. 2016
          </m.div>

          <h1 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-[3.6rem]">
            Trusted Legal Representation Across Multiple{" "}
            <span className="text-assent">Practice Areas</span>
          </h1>

          <m.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
          >
            From property disputes to corporate advisory, our experienced legal
            team provides practical solutions tailored to your needs.
          </m.p>

          <m.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <m.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                to="/appointment"
                aria-label="Schedule a free legal consultation with Lawzra LLP"
                className="flex cursor-pointer items-center gap-2 rounded-sm bg-assent px-6 py-3 font-semibold text-[#101826] transition-colors duration-300 hover:bg-[#dbbb8c]"
              >
                Schedule a Consultation
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </m.div>

            <Link
              to="/areas-of-practice"
              className="font-docket flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-assent"
            >
              View Practice Areas
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </m.div>

          <m.div
            variants={item}
            className="mt-6 flex items-center gap-2.5 text-sm italic text-white/70"
          >
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            Free Initial Consultation Available
          </m.div>

          {/* Citation-style divider */}
          <m.div
            variants={item}
            className="mt-14 border-t border-white/10 pt-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {clientAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    className="size-9 rounded-full border-2 border-[#101826] object-cover"
                    src={avatar.src}
                    alt={avatar.alt}
                    width={36}
                    height={36}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <span className="font-docket text-xs tracking-wide text-white/50">
                10+ Years Combined Legal Experience
              </span>
            </div>
          </m.div>
        </m.div>

        {/* Right: "case file" — image slideshow inside a folder motif, sealed */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="relative"
        >
          {/* Folder tab */}
          <div className="relative ml-6 flex w-fit items-center gap-2 rounded-t-sm bg-[#16223a] px-4 py-2">
            <span className="font-docket text-[10px] uppercase tracking-[0.2em] text-assent">
              Exhibit A — Gallery
            </span>
          </div>

          <div className="border border-assent/30 bg-[#16223a] p-2.5">
            <HeroImageSlideshow images={heroImages} />
          </div>

          {/* Seal / stamp, overlapping the folder's edge like a wax seal on a case file */}
          <m.div
            initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="absolute -bottom-8 -left-8 hidden size-32 sm:block"
          >
            <svg
              viewBox="0 0 200 200"
              className="size-full drop-shadow-lg"
              role="img"
              aria-labelledby="hero-seal-title"
            >
              <title id="hero-seal-title">
                Lawzra LLP official seal — Trusted Counsel Since 2016
              </title>
              <defs>
                <path
                  id="sealArc"
                  d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                />
              </defs>
              <circle cx="100" cy="100" r="96" fill="#F3EEE2" />
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="none"
                stroke="#C9A876"
                strokeWidth="3"
              />
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#C9A876"
                strokeWidth="1"
              />
              <text
                fill="#101826"
                fontSize="11.5"
                letterSpacing="2"
                className="font-docket"
              >
                <textPath href="#sealArc" startOffset="0%">
                  LAWZRA · TRUSTED COUNSEL · SINCE 2016 ·
                </textPath>
              </text>
              <text
                x="100"
                y="94"
                textAnchor="middle"
                fill="#101826"
                fontSize="34"
                className="font-display"
              >
                10+
              </text>
              <text
                x="100"
                y="116"
                textAnchor="middle"
                fill="#6B1F2A"
                fontSize="10.5"
                letterSpacing="2"
                className="font-docket"
              >
                YEARS
              </text>
            </svg>
          </m.div>
        </m.div>
      </div>

      {/* Credentials strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#0C1420]">
        <div className="font-docket mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-4 text-center text-[11px] uppercase tracking-[0.15em] text-white/40">
          <span>Serving Clients Across Nigeria</span>
          <span className="text-assent/50" aria-hidden="true">
            |
          </span>
          <span>Committed to Excellence</span>
          <span className="text-assent/50" aria-hidden="true">
            |
          </span>
          <span>Integrity</span>
          <span className="text-assent/50" aria-hidden="true">
            |
          </span>
          <span>Results</span>
          <span className="text-assent/50" aria-hidden="true">
            |
          </span>
          <span>Member, Nigerian Bar Association</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
