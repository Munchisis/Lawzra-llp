import { m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cardsData } from "../../data/testimonials";

const CreateCard = ({ card }) => (
  <div className="mx-4 flex w-80 shrink-0 flex-col justify-between rounded-sm border border-[#C9A876]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-[#16223a]">
    <div>
      <div className="flex gap-3">
        <img
          className="size-12 rounded-full object-cover ring-2 ring-[#C9A876]/25"
          src={card.image}
          alt={card.name}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-display font-semibold text-[#101826] dark:text-white">
              {card.name}
            </p>
            {/* Kept blue — this signals "verified," a recognized meaning distinct from brand color */}
            <CheckCircle2 className="h-4 w-4 fill-blue-500/10 text-blue-500" />
          </div>
          <span className="font-docket text-[11px] text-[#4B5262] dark:text-white/40">
            {card.handle}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm italic leading-relaxed text-[#4B5262] dark:text-white/70">
        "{card.testimonial}"
      </p>
    </div>

    <div className="mt-4 flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-lg text-[#C9A876]">
          ★
        </span>
      ))}
    </div>
  </div>
);

const Testimonial = () => {
  return (
    <section className="overflow-hidden bg-[#FAF8F3] py-20 transition-colors dark:bg-[#101826]">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 px-6 text-center"
      >
        <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
          Client Testimony
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
        </div>

        <h2 className="font-display text-3xl font-medium text-[#101826] dark:text-white md:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[#4B5262] dark:text-white/60">
          Hear from our satisfied clients who have experienced the difference
          with Lawzra Law Firm.
        </p>
      </m.div>

      {/* Animated Marquee Container */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative w-full overflow-hidden"
      >
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-linear-to-r from-[#FAF8F3] to-transparent dark:from-[#101826] md:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-linear-to-l from-[#FAF8F3] to-transparent dark:from-[#101826] md:w-40" />

        <div className="animate-marquee-scroll flex py-4 hover:[animation-play-state:paused]">
          {[...cardsData, ...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default Testimonial;
