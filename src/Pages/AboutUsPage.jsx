import { Helmet } from "react-helmet-async";
import { assets } from "../assets/assets";
import { companyGoals, aboutSections } from "../data/constants";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedPage from "../component/AnimatedPage";

const SITE_URL = "https://lawzra.com";

const AboutUsPage = () => {
  const containerRef = useRef(null);

  // Track scroll progress specifically for this hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress (0 to 1) to a Y-axis movement (e.g., 0px to 200px)
  // This makes the background move slower than the scroll, creating depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const pageTitle = "About Us | Lawzra LLP";
  const pageDescription =
    "Lawzra LLP is a full-service law firm with proven experience and expertise across diverse areas of the law.";
  const canonicalUrl = `${SITE_URL}/about-us`;

  return (
    <AnimatedPage>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <div className="bg-[#FAF8F3] pb-14 sm:pb-20 dark:bg-[#101826]">
        {/* Hero Header */}
        <div
          ref={containerRef}
          className="relative isolate flex h-[45vh] sm:h-[55vh] lg:h-[60vh] flex-col items-center justify-center overflow-hidden px-4 text-white"
        >
          <m.div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${assets.aboutUs4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              y: backgroundY,
            }}
          />

          {/* Overlay — needed for text legibility over the photo */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A0F18]/80 via-[#0A0F18]/55 to-[#0A0F18]/85" />

          {/* Floating Text Content */}
          <m.div style={{ y: textY }} className="relative z-20 text-center">
            <div className="font-docket mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C9A876]">
              <span className="h-px w-6 sm:w-8 bg-[#C9A876]/60" />
              The Firm
              <span className="h-px w-6 sm:w-8 bg-[#C9A876]/60" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium">
              About Us
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl px-2 text-sm sm:text-base lg:text-lg text-white/75">
              We are a Full-Service Law firm with a depth of proven experience
              and expertise in diverse areas of the law
            </p>
          </m.div>
        </div>

        {/* 1. Vision/Mission/Values Map */}
        <m.section className="mx-auto mb-12 sm:mb-16 lg:mb-20 mt-12 sm:mt-16 lg:mt-20 grid max-w-7xl grid-cols-1 gap-8 sm:gap-10 px-4 sm:px-6 md:grid-cols-3">
          {companyGoals.map((goal, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              // Each card waits 0.2s longer than the previous one
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-sm text-[#4B5262] dark:text-white/60"
            >
              <h1 className="font-docket text-xs uppercase tracking-widest text-[#B08D57] dark:text-[#C9A876]">
                {goal.title}
              </h1>
              <h2 className="font-display mt-1 text-lg sm:text-xl text-[#101826] dark:text-white">
                {goal.subtitle}
              </h2>
              <p className="mt-4 border-t border-[#C9A876]/20 pt-4 leading-relaxed dark:border-white/10">
                {goal.description}
              </p>
            </m.div>
          ))}
        </m.section>

        {/* 2. Identity & Awards Sections Map */}
        {aboutSections.map((section, index) => (
          <m.section
            key={section.id}
            initial={{ opacity: 0, x: section.reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col ${section.reverse ? "md:flex-row-reverse" : "md:flex-row"} mx-auto mb-12 sm:mb-16 lg:mb-20 max-w-7xl items-center justify-center gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6`}
          >
            <div className="max-w-lg text-sm text-[#4B5262] dark:text-white/60 text-center md:text-left">
              <h1 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#101826] dark:text-white">
                {section.title}
              </h1>
              <div className="mt-2 h-0.75 w-16 bg-[#C9A876] mx-auto md:mx-0" />
              <div className="mt-6 sm:mt-8 space-y-4 leading-relaxed text-left">
                {section.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="relative w-full shrink-0 overflow-hidden rounded-sm border border-[#C9A876]/25 md:w-1/2">
              <img
                className="h-64 sm:h-80 md:h-100 w-full object-cover"
                src={section.image}
                alt={section.title}
              />
            </div>
          </m.section>
        ))}
      </div>
    </AnimatedPage>
  );
};

export default AboutUsPage;
