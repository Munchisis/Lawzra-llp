import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "motion/react";

/**
 * Uses the same 'font-display' (Fraunces) and 'font-docket' (IBM Plex Mono)
 * utility classes defined globally alongside Hero.jsx. If those classes
 * aren't yet global, keep the <style> block from Hero.jsx in a shared layout
 * component rather than duplicating it here.
 */

const AboutUs = () => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-14 overflow-hidden bg-[#FAF8F3] px-4 py-24 dark:bg-[#101826] md:flex-row md:gap-16">
      {/* Framed portrait */}
      <m.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative shrink-0 border border-[#C9A876]/40 bg-white p-2.5 dark:border-[#C9A876]/30 dark:bg-[#16223a]"
      >
        <img
          className="aspect-square w-full max-w-md rounded-sm object-cover"
          src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
          alt="A member of the Lawzra legal team"
        />
        {/* Small corner tab, echoes the seal on the hero image */}
        <div className="font-docket absolute -bottom-4 -right-4 hidden bg-[#C9A876] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[#101826] shadow-md sm:block">
          Est. 2016
        </div>
      </m.div>

      {/* Text */}
      <m.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-lg text-[15px] leading-relaxed text-[#4B5262] dark:text-white/65"
      >
        <div className="font-docket flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
          About — Firm Profile
        </div>

        <h1 className="font-display mt-4 text-3xl font-medium leading-tight text-[#101826] dark:text-white md:text-4xl">
          About Us
        </h1>

        <div className="mt-5 h-[3px] w-14 bg-[#C9A876]" />

        <p className="mt-8">
          Lawzra is a premier legal services firm dedicated to providing expert
          legal guidance and trusted solutions to clients across various
          practice areas. With a team of experienced attorneys, we are committed
          to delivering exceptional service and achieving favorable outcomes for
          our clients.
        </p>

        <p className="mt-4">
          Our mission is to empower individuals and businesses alike by
          navigating the complexities of the legal landscape with integrity,
          professionalism, and personalized attention.
        </p>

        <p className="mt-4">
          At Lawzra, we believe in building lasting relationships with our
          clients based on trust and transparency. We take the time to
          understand each client's unique needs and tailor our legal strategies
          accordingly.
        </p>

        <m.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-9 w-max"
        >
          <Link
            to="/About-us"
            className="flex w-max cursor-pointer items-center gap-2 rounded-sm bg-[#C9A876] px-7 py-3 font-semibold text-[#101826] transition-colors duration-300 hover:bg-[#dbbb8c]"
          >
            <span>Read more</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </m.div>
      </m.div>
    </section>
  );
};

export default AboutUs;
