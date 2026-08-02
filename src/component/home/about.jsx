import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "motion/react";
import { assets } from "../../assets/assets";

const AboutUs = () => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-14 overflow-hidden bg-[#FAF8F3] px-4 py-24 dark:bg-[#101826] md:flex-row md:gap-16">
      {/* Framed portrait */}
      <m.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative shrink-0 border border-assent/40 bg-white p-2.5 dark:border-assent/30 dark:bg-[#16223a]"
      >
        <img
          className="w-full max-w-md rounded-sm object-cover"
          src={assets.aboutUsHome896}
          srcSet={`${assets.aboutUsHome896} 896w, ${assets.aboutUsHome1792} 1792w`}
          sizes="896px"
          alt="Profile image of the Lawzra LLP"
          width="896"
          height="489"
        />
        {/* Small corner tab, echoes the seal on the hero image */}
        <div className="font-docket absolute -bottom-4 -right-4 hidden bg-assent px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[#101826] shadow-md sm:block">
          Est. 2016
        </div>
      </m.div>

      {/* Text */}
      <m.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-lg text-[15px] leading-relaxed text-primary-text dark:text-white/65"
      >
        <div className="font-docket flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-secondary-assent dark:text-assent">
          <span className="h-px w-8 bg-secondary-assent/60 dark:bg-assent/60" />
          About — Firm Profile
        </div>

        <h1 className="font-display mt-4 text-3xl font-medium leading-tight text-[#101826] dark:text-white md:text-4xl">
          About Us
        </h1>

        <div className="mt-5 h-0.75 w-14 bg-assent" />

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
            to="/about-us"
            aria-label="Learn more about Lawzra LLP"
            className="flex w-max cursor-pointer items-center gap-2 rounded-sm bg-assent px-7 py-3 font-semibold text-[#101826] transition-colors duration-300 hover:bg-[#dbbb8c]"
          >
            <span>Learn More about Us</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </m.div>
      </m.div>
    </section>
  );
};

export default AboutUs;
