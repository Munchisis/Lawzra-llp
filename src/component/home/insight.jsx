import { homeInsightsData } from "../../assets/assets";
import { ArrowRight, Calendar } from "lucide-react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";

const Insight = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative mx-4 mb-10 overflow-hidden rounded-sm border border-[#C9A876]/15 bg-white py-20 dark:border-white/10 dark:bg-[#101826] md:mx-10 lg:mx-20">
      {/* Subtle Background Accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/4 rounded-full bg-[#C9A876]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <div className="flex flex-col items-end justify-between gap-10 md:flex-row">
          <div className="max-w-2xl">
            <m.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-docket mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]"
            >
              <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
              Insights — Latest Research
            </m.div>

            <m.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="font-display text-3xl font-medium leading-tight tracking-tight text-[#101826] dark:text-white md:text-4xl lg:text-6xl"
            >
              Insights <span className="text-[#C9A876]">.</span>
            </m.h1>

            <m.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="mt-6 max-w-lg text-lg leading-relaxed text-[#4B5262] dark:text-white/60"
            >
              Deep-dive analysis into the legal shifts shaping our world,
              curated by our global legal experts.
            </m.p>
          </div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            <Link
              to="/insights"
              className="group flex items-center gap-3 rounded-sm bg-[#C9A876] px-9 py-4 font-semibold text-[#101826] transition-colors duration-300 hover:bg-[#dbbb8c] active:scale-95"
            >
              View Archive
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </m.div>
        </div>

        {/* Cards Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {homeInsightsData.slice(0, 3).map((area, index) => (
            <m.div
              key={area.id || index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group flex flex-col overflow-hidden rounded-sm border border-[#C9A876]/20 bg-[#FAF8F3] transition-all duration-500 hover:border-[#C9A876] hover:shadow-[0_20px_50px_rgba(16,24,38,0.08)] dark:border-white/10 dark:bg-[#16223a] dark:hover:border-[#C9A876]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={area.image}
                  alt={area.title}
                />
                <div className="absolute inset-0 bg-[#101826]/10 transition-colors group-hover:bg-[#101826]/0" />
              </div>

              <div className="flex grow flex-col p-7">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-docket rounded-sm bg-[#C9A876]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#B08D57] dark:bg-[#C9A876]/15 dark:text-[#C9A876]">
                    {area.title}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#4B5262]/70 dark:text-white/40">
                    <Calendar className="h-3.5 w-3.5" />
                    Jan 20, 2026
                  </span>
                </div>

                <h3 className="font-display mb-3 text-xl leading-snug text-[#101826] transition-colors line-clamp-2 group-hover:text-[#8A6A38] dark:text-white dark:group-hover:text-[#C9A876]">
                  Navigating the Complexities of Global Trade Laws
                </h3>

                <p className="mb-8 text-sm leading-relaxed text-[#4B5262] line-clamp-3 dark:text-white/60">
                  {area.description}
                </p>

                <div className="mt-auto border-t border-[#C9A876]/15 pt-5 dark:border-white/10">
                  <span className="font-docket inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#101826] transition-all group-hover:gap-4 dark:text-white">
                    Read Full Case
                    <ArrowRight className="h-4 w-4 text-[#C9A876]" />
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Insight;
