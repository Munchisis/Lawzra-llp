import { useNavigate } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import { practiceAreasCard, assets } from "../data/practiceData";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import AnimatedPage from "../component/AnimatedPage";

const PracticeAreaPage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Track scroll progress specifically for this hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress (0 to 1) to a Y-axis movement (e.g., 0px to 40%/100%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Framer Motion Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-[#FAF8F3] pb-24 dark:bg-[#101826]">
        {/* Hero Section with Parallax */}
        <div
          ref={containerRef}
          className="relative isolate flex h-[60vh] flex-col items-center justify-center overflow-hidden px-4 text-white"
        >
          <m.div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${assets.corporate})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              y: backgroundY,
            }}
          />

          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 z-10 bg-linear-to-b from-[#0A0F18]/80 via-[#0A0F18]/55 to-[#0A0F18]/85" />

          {/* Parallax Floating Text Content */}
          <m.div style={{ y: textY }} className="relative z-20 text-center">
            <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#C9A876]">
              <span className="h-px w-8 bg-[#C9A876]/60" />
              Areas of Counsel
              <span className="h-px w-8 bg-[#C9A876]/60" />
            </div>
            <h1 className="font-display text-5xl font-medium">
              Practice Areas
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
              Explore our diverse practice areas where our legal experts provide
              tailored solutions to meet your needs.
            </p>
          </m.div>
        </div>

        {/* Dynamic Card Grid Layout */}
        <div className="mx-auto mt-20 max-w-7xl px-6">
          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {practiceAreasCard.map((area) => (
              <m.div
                variants={item}
                key={area.path}
                onClick={() => navigate(`/areas-of-practice/${area.path}`)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-sm border border-[#C9A876]/20 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A876] hover:shadow-xl dark:border-white/10 dark:bg-[#16223a] dark:hover:border-[#C9A876]"
              >
                {/* Image Component Block with Hover Zoom */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={area.image}
                    alt={area.title}
                  />
                  {/* Floating Scales Icon Badge */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#101826]/90">
                    <Scale
                      size={16}
                      className="text-[#B08D57] dark:text-[#C9A876]"
                    />
                  </div>
                </div>

                {/* Card Text Content Block */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-4 line-clamp-2 font-display text-lg text-[#101826] dark:text-white">
                    {area.title}
                  </h3>
                  <div className="mt-auto">
                    <span className="font-docket flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#B08D57] transition-all group-hover:gap-4 dark:text-[#C9A876]">
                      View Expertise <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>

        {/* Firm Call to Action Unit */}
        <section className="mx-auto mt-32 max-w-5xl rounded-sm border border-[#C9A876]/20 bg-[#0C1420] p-12 px-6 text-center text-white">
          <h2 className="font-display mb-4 text-3xl">
            Need Specialized Legal Counsel?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/60">
            Our partners are ready to discuss your specific requirements and
            develop a strategic approach to your case.
          </p>
          <button
            onClick={() => navigate("/appointment")}
            className="cursor-pointer rounded-sm bg-[#C9A876] px-10 py-4 font-bold text-[#101826] shadow-lg transition-all hover:bg-[#dbbb8c] active:scale-95"
          >
            Book a Consultation
          </button>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default PracticeAreaPage;
