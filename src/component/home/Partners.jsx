import { m } from "framer-motion";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { partnerInfo } from "../../assets/assets";

const Partners = () => {
  return (
    <section className="overflow-hidden bg-[#FAF8F3] px-4 py-24 dark:bg-[#101826] md:px-20">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="font-docket flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
          The Partners — Leadership
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
        </div>

        <h1 className="font-display mt-4 text-3xl font-medium text-[#101826] dark:text-white md:text-4xl">
          Our Partners
        </h1>

        <p className="mx-auto mt-4 max-w-lg px-4 text-sm text-[#4B5262] dark:text-white/60">
          Meet the leadership driving our commitment to legal excellence and
          strategic innovation.
        </p>
      </m.div>

      {/* Partners Accordion Container */}
      <div className="mx-auto mt-12 flex h-auto w-full max-w-7xl flex-col items-center justify-center gap-4 px-6 md:h-[550px] md:flex-row md:gap-3">
        {partnerInfo.map((partner, index) => (
          <m.div
            key={partner.id || index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            // Hover Expansion Logic
            whileHover={{ flex: 2 }}
            className="group relative h-80 w-full cursor-pointer overflow-hidden rounded-sm border border-[#C9A876]/25 transition-all duration-500 ease-out md:h-full md:flex-1"
          >
            <m.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full object-cover object-top"
              src={partner.img}
              alt={partner.title}
            />

            {/* Overlay Content — ink navy tint instead of pure black */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0A0F18]/95 via-[#0A0F18]/35 to-transparent p-6 text-white transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
              <m.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-docket text-[10px] uppercase tracking-[0.15em] text-[#C9A876]">
                  Partner
                </span>
                <h2 className="font-display mt-1 text-xl leading-tight md:text-2xl">
                  {partner.title}
                </h2>
                <p className="mt-2 text-xs text-white/70 md:text-sm line-clamp-2 md:line-clamp-none">
                  {partner.desc}
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href={partner.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="rounded-full bg-white/10 p-2 transition-colors hover:bg-[#C9A876] hover:text-[#101826]"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${partner.email}`}
                    className="rounded-full bg-white/10 p-2 transition-colors hover:bg-[#C9A876] hover:text-[#101826]"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </m.div>
            </div>
          </m.div>
        ))}
      </div>

      {/* CTA Button */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 flex justify-center"
      >
        <Link
          to="/our-team"
          className="group flex items-center gap-2 rounded-sm bg-[#C9A876] px-8 py-3.5 font-semibold text-[#101826] shadow-lg transition-colors duration-300 hover:bg-[#dbbb8c] active:scale-95"
        >
          Meet the Full Team
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </m.div>
    </section>
  );
};

export default Partners;
