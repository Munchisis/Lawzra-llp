import { m, useScroll, useTransform } from "framer-motion";
import TeamCard from "../component/teamCard";
import { assets } from "../assets/assets";
import AnimatedPage from "../component/AnimatedPage";
import { useRef } from "react";

const OurTeamPage = () => {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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

  return (
    <AnimatedPage>
      <div className="bg-[#FAF8F3] pb-24 dark:bg-[#101826]">
        {/* Hero Section */}
        <div
          ref={containerRef}
          className="relative isolate flex h-[60vh] flex-col items-center justify-center overflow-hidden px-4 text-white mb-10"
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

          {/* Overlay — was missing; needed for text legibility over the photo */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A0F18]/80 via-[#0A0F18]/55 to-[#0A0F18]/85" />

          {/* Floating Text Content */}
          <m.div style={{ y: textY }} className="relative z-20 text-center">
            <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#C9A876]">
              <span className="h-px w-8 bg-[#C9A876]/60" />
              The People
              <span className="h-px w-8 bg-[#C9A876]/60" />
            </div>
            <h1 className="font-display text-5xl font-medium">Our Team</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
              Meet the dedicated professionals driving excellence at Lawzra.
            </p>
          </m.div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 md:flex-1">
          {/* -------- Mgboji Uchenna Emmanuel ---------- */}
          <section className="flex flex-col items-center justify-center gap-16 lg:flex-row">
            <m.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-2xl text-base leading-relaxed text-[#4B5262] dark:text-white/70"
            >
              <h2 className="font-display mb-6 text-3xl text-[#101826] dark:text-white">
                Mgboji Uchenna Emmanuel
              </h2>
              <p className="font-docket mb-6 border-l-4 border-[#C9A876] pl-6 text-sm uppercase tracking-wide not-italic text-[#B08D57] dark:text-[#C9A876]">
                Founder and Senior Partner of Lawzra LP
              </p>
              <p>
                With extensive experience in Intellectual Property Law, Media
                Law, and Corporate Transactions, Uchenna has played a central
                role in the firm's notable successes, particularly within its
                ADR practice.
              </p>
              <p className="mt-4">
                He holds a Master's degree from the East China University of
                Political Science and Law and is a registered member of the
                Nigerian Institute of Chartered Arbitrators and the WIPO
                Academy.
              </p>
            </m.div>

            <m.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TeamCard
                image={assets.lawyer1}
                name="Mgboji Uchenna Emmanuel"
                position="Senior Partner"
              />
            </m.div>
          </section>

          {/* -------- Macsunny Ezikpe Nwoke (Reversed Layout) ---------- */}
          <section className="flex flex-col items-center justify-center gap-16 lg:flex-row-reverse">
            <m.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-2xl text-base leading-relaxed text-[#4B5262] dark:text-white/70"
            >
              <h2 className="font-display mb-6 text-right text-3xl text-[#101826] dark:text-white lg:text-left">
                Macsunny Ezikpe Nwoke
              </h2>
              <p className="font-docket mb-6 border-r-4 border-[#C9A876] pr-6 text-right text-sm uppercase tracking-wide not-italic text-[#B08D57] dark:text-[#C9A876] lg:border-r-0 lg:border-l-4 lg:pr-0 lg:pl-6 lg:text-left">
                Tax Law & Property Law
              </p>
              <p>
                Macsunny is distinguished by his analytical depth and over a
                decade of practical experience in Tax Law, complemented by more
                than a decade of experience in Property Law and property
                transactions. His experience as a prosecutor in both Tax and
                Criminal Law affords him a rare blend of litigation expertise
                and strategic legal insight.
              </p>
              <p className="mt-4">
                He also maintains a strong practice in Wills and Estate Law,
                providing meticulous legal support in estate planning, probate,
                and succession matters.
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <TeamCard
                name="Macsunny Ezikpe Nwoke"
                position="Consultant"
                image={assets.lawyer2}
              />
            </m.div>
          </section>

          {/* -------- Emuchay Chigozie Kelechi ---------- */}
          <section className="mb-12 flex flex-col items-center justify-center gap-16 lg:flex-row">
            <m.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-2xl text-base leading-relaxed text-[#4B5262] dark:text-white/70"
            >
              <h2 className="font-display mb-6 text-3xl text-[#101826] dark:text-white">
                Emuchay Chigozie Kelechi
              </h2>
              <p className="font-docket mb-6 border-l-4 border-[#C9A876] pl-6 text-sm uppercase tracking-wide not-italic text-[#B08D57] dark:text-[#C9A876]">
                IT & Corporate Consultant
              </p>
              <p>
                Specializing in Corporate Law and Commercial Transactions,
                Emuchay provides meticulous legal research and practical
                solutions to complex challenges.
              </p>
              <p className="mt-4">
                A graduate of the Abia State University Uturu, his commitment to
                excellence in Technical Writing and Technology Law has earned
                him a reputation as a reliable strategic advisor.
              </p>
            </m.div>

            <m.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TeamCard
                name="Emuchay Chigozie Kelechi"
                position="IT Consultant"
                image={assets.lawyer3}
              />
            </m.div>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default OurTeamPage;
