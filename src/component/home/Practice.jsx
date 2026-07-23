import { Link, useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { practiceAreasHome } from "../../data/practiceData";

const Practice = () => {

  const navigate = useNavigate();


  return (
    <section className="bg-[#FAF8F3] px-4 py-24 dark:bg-[#101826]">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="font-docket flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
          Areas of Counsel
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
        </div>

        <h1 className="font-display mt-4 text-3xl font-medium text-[#101826] dark:text-white md:text-4xl">
          Practice Areas
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#4B5262] dark:text-white/60">
          We provide comprehensive legal services tailored to meet the needs of
          individuals, businesses, and institutions.
        </p>
      </m.div>

      {/* Grid */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {practiceAreasHome.map((area, index) => (
          <m.div
            key={area.id || index}
            onClick={() => navigate(`/areas-of-practice/${area.path}`)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <Link
              to={`/practice-areas/${area.path}`}
              className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-sm border border-[#C9A876]/20 bg-white p-8 transition-all duration-300 hover:border-[#C9A876] hover:shadow-xl dark:border-white/10 dark:bg-[#16223a] dark:hover:border-[#C9A876]"
            >
              {/* Decorative background element on hover */}
              <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-[#C9A876]/10 transition-transform duration-500 group-hover:scale-[6]" />

              <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                <span className="font-docket text-xs text-[#C9A876]">§</span>
                <h3 className="font-display text-lg text-[#101826] transition-colors group-hover:text-[#8A6A38] dark:text-white dark:group-hover:text-[#C9A876]">
                  {area.title}
                </h3>
                <p className="text-sm text-[#4B5262] dark:text-white/60">
                  {area.subtitle}
                </p>
              </div>
            </Link>
          </m.div>
        ))}
      </div>
    </section>
  );
};

export default Practice;
