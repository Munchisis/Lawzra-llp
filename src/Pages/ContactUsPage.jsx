import { assets } from "../assets/assets";
import { m, useScroll, useTransform } from "framer-motion";
import SpeakToALawyer from "../component/home/SpeakToALawyer";
import { useRef } from "react";

const ContactUsPage = () => {
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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <m.div initial="hidden" animate="visible" className="bg-[#FAF8F3] pb-20 dark:bg-[#101826]">
      {/* Hero Header */}
      <div
        ref={containerRef}
        className="relative isolate flex h-[60vh] flex-col items-center justify-center overflow-hidden px-4 text-white"
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
        <div className="absolute inset-0 z-10 bg-linear-to-b from-[#0A0F18]/80 via-[#0A0F18]/55 to-[#0A0F18]/85" />

        {/* Floating Text Content */}
        <m.div style={{ y: textY }} className="relative z-20 text-center">
          <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#C9A876]">
            <span className="h-px w-8 bg-[#C9A876]/60" />
            The Firm
            <span className="h-px w-8 bg-[#C9A876]/60" />
          </div>
          <h1 className="font-display text-5xl font-medium">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
            Have questions or need assistance? Reach out to us using the
            contact information below.
          </p>
        </m.div>
      </div>

      {/* Section Header */}
      <div className="mb-10 mt-20 text-center">
        <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
          Locations
          <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
        </div>
        <h2 className="font-display text-3xl text-[#101826] dark:text-white">
          Our Offices
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 px-6 lg:flex-row">
        {/* Office Locations */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-1 flex-col justify-between gap-8 md:flex-row"
        >
          {/* Umuahia */}
          <m.div variants={fadeInUp} className="flex-1 text-center text-[#4B5262] dark:text-white/60">
            <h3 className="font-display mx-auto mb-5 w-1/2 border-b border-[#C9A876]/30 pb-2 uppercase tracking-widest text-[#101826] dark:text-white">
              Umuahia
            </h3>
            <p className="mb-4 h-12 text-sm">
              23 Umuahia Road, Umuahia, Abia State
            </p>
            <div className="overflow-hidden rounded-sm border border-[#C9A876]/20 dark:border-white/10">
              <iframe
                title="Umuahia Address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.282277354315!2d7.490965307056033!3d5.525071033944038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1042dcc55fcfb9d3%3A0x895808b4da555136!2s23%20Ikot%20Ekpene%20-%20Umuahia%20Rd%2C%20Umu%20Obasi%2C%20Umuahia%20440236%2C%20Abia!5e0!3m2!1sen!2sng!4v1772536857376!5m2!1sen!2sng"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </m.div>

          {/* Lagos */}
          <m.div variants={fadeInUp} className="flex-1 text-center text-[#4B5262] dark:text-white/60">
            <h3 className="font-display mx-auto mb-5 w-1/2 border-b border-[#C9A876]/30 pb-2 uppercase tracking-widest text-[#101826] dark:text-white">
              Lagos
            </h3>
            <p className="mb-4 h-12 text-sm">456 Victoria Island, Lagos</p>
            <div className="overflow-hidden rounded-sm border border-[#C9A876]/20 dark:border-white/10">
              <iframe
                title="Lagos Address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5649008489004!2d3.4064220202624313!3d6.449863207461226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b302639d0f9%3A0xee176cf139947aaf!2s23%20Obalende%20Rd%2C%20Ikoyi%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1772548996488!5m2!1sen!2sng"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </m.div>

          {/* Abuja */}
          <m.div variants={fadeInUp} className="flex-1 text-center text-[#4B5262] dark:text-white/60">
            <h3 className="font-display mx-auto mb-5 w-1/2 border-b border-[#C9A876]/30 pb-2 uppercase tracking-widest text-[#101826] dark:text-white">
              Abuja
            </h3>
            <p className="mb-4 h-12 text-sm">789 Wuse, Abuja</p>
            <div className="overflow-hidden rounded-sm border border-[#C9A876]/20 dark:border-white/10">
              <iframe
                title="Abuja Address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1927.7385738209975!2d7.473999014843507!3d9.078412525742701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0afd946acf11%3A0x641c035f13845f8b!2sWuse%2C%20Abuja%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1773645356501!5m2!1sen!2sng"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </m.div>
        </m.div>

        {/* Sidebar Info & Socials */}
        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex w-full flex-col gap-6 border-t border-[#C9A876]/20 p-6 dark:border-white/10 lg:w-72 lg:border-l lg:border-t-0"
        >
          <div className="text-center">
            <h4 className="font-docket text-xs uppercase tracking-widest text-[#B08D57] dark:text-[#C9A876]">
              Call us
            </h4>
            <a
              href="tel:+2348037333930"
              className="text-sm text-[#4B5262] transition-colors hover:text-[#101826] dark:text-white/60 dark:hover:text-white"
            >
              +234 803 733 3930
            </a>
          </div>

          <div className="border-t border-[#C9A876]/15 pt-6 text-center dark:border-white/10">
            <h4 className="font-docket text-xs uppercase tracking-widest text-[#B08D57] dark:text-[#C9A876]">
              Email
            </h4>
            <a
              href="mailto:contact@lawzra.com"
              className="text-sm text-[#4B5262] transition-colors hover:text-[#101826] dark:text-white/60 dark:hover:text-white"
            >
              contact@lawzra.com
            </a>
          </div>

          <div className="border-t border-[#C9A876]/15 pt-6 text-center dark:border-white/10">
            <h4 className="font-docket text-xs uppercase tracking-widest text-[#B08D57] dark:text-[#C9A876]">
              Head office
            </h4>
            <p className="text-sm text-[#4B5262] dark:text-white/60">
              No 23 Obalende, Lekki Phase 1, Lagos State
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-6">
            {/* Social icons with hover animation */}
            {[
              { href: "https://x.com", icon: <TwitterIcon /> },
              { href: "https://github.com", icon: <GithubIcon /> },
              { href: "https://linkedin.com", icon: <LinkedinIcon /> },
            ].map((social, idx) => (
              <m.a
                key={idx}
                href={social.href}
                target="_blank"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-[#4B5262] transition-colors hover:text-[#B08D57] dark:text-white/50 dark:hover:text-[#C9A876]"
              >
                {social.icon}
              </m.a>
            ))}
          </div>
        </m.div>
      </div>
      <div className="pt-20">
        <SpeakToALawyer />
      </div>
    </m.div>
  );
};

// Simple Icon Components
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);
const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default ContactUsPage;
