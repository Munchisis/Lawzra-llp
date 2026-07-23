import { useNavigate } from "react-router-dom";
import { m, useScroll, useTransform } from "framer-motion";
import TeamCard from "../component/teamCard";
import { partnerInfo } from "../data/partnerData.js";
import { assets } from "../assets/assets";
import AnimatedPage from "../component/AnimatedPage";
import { useRef } from "react";

const OurTeamPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <AnimatedPage>
      <div className="bg-[#FAF8F3] pb-16 sm:pb-24 dark:bg-[#101826]">
        {/* Parallax Hero Header */}
        <div
          ref={containerRef}
          className="relative isolate flex h-[45vh] sm:h-[55vh] lg:h-[60vh] flex-col items-center justify-center overflow-hidden px-4 text-white mb-6 sm:mb-10"
        >
          <m.div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${assets.aboutUs4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              y: backgroundY,
            }}
          />
          <div className="absolute inset-0 z-10 bg-linear-to-b from-[#0A0F18]/80 via-[#0A0F18]/55 to-[#0A0F18]/85" />

          <m.div style={{ y: textY }} className="relative z-20 text-center">
            <div className="font-docket mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C9A876]">
              <span className="h-px w-6 sm:w-8 bg-[#C9A876]/60" /> The People{" "}
              <span className="h-px w-6 sm:w-8 bg-[#C9A876]/60" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium">
              Our Team
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl px-2 text-sm sm:text-base lg:text-lg text-white/75">
              Meet the dedicated professionals driving excellence at Lawzra.
            </p>
          </m.div>
        </div>

        {/* Dynamic Alternating Team Sections */}
        <div className="mx-auto flex max-w-7xl flex-col gap-16 sm:gap-20 lg:gap-32 px-4 sm:px-6 md:flex-1">
          {partnerInfo.map((member, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <section
                key={member.slug}
                className={`flex flex-col items-center justify-center gap-10 sm:gap-16 lg:flex-row ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Block rendering the shortDesc */}
                <m.div
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#4B5262] dark:text-white/70 lg:text-left ${
                    isReversed ? "lg:text-left" : ""
                  }`}
                >
                  <h2
                    className={`font-display mb-4 sm:mb-6 text-2xl sm:text-3xl text-[#101826] dark:text-white text-center lg:text-left ${
                      isReversed ? "lg:text-left" : ""
                    }`}
                  >
                    {member.name}
                  </h2>
                  <p
                    className={`font-docket mb-4 sm:mb-6 inline-block text-xs sm:text-sm uppercase tracking-wide not-italic text-[#B08D57] dark:text-[#C9A876] border-[#C9A876] border-l-4 pl-4 sm:pl-6 text-left ${
                      isReversed ? "lg:border-l-4 lg:border-r-0 lg:pl-6" : ""
                    }`}
                  >
                    {member.title}
                  </p>

                  {/* Maps out your brief intro description blocks exclusively */}
                  {member.shortDesc.map((paragraph, pIdx) => (
                    <p key={pIdx} className={pIdx > 0 ? "mt-3 sm:mt-4" : ""}>
                      {paragraph}
                    </p>
                  ))}

                  {/* Dynamic View Detail link that fires navigate() */}
                  <button
                    onClick={() => navigate(`/our-team/${member.slug}`)}
                    className="mt-5 sm:mt-6 font-docket text-xs uppercase tracking-widest text-[#B08D57] hover:text-[#101826] dark:text-[#C9A876] dark:hover:text-white underline underline-offset-4 cursor-pointer block"
                  >
                    View Full Biography &rarr;
                  </button>
                </m.div>

                {/* Team Card Visual */}
                <m.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onClick={() => navigate(`/our-team/${member.slug}`)}
                  className="cursor-pointer w-full max-w-xs sm:max-w-sm lg:w-auto lg:max-w-none"
                >
                  <TeamCard
                    image={member.image}
                    name={member.name}
                    position={member.position}
                  />
                </m.div>
              </section>
            );
          })}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default OurTeamPage;
