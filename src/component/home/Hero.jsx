import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { assets } from "../../assets/assets";
import HeroImageSlideshow from "../HeroImageSlideshow";


const Hero = () => {
  const navigate = useNavigate();
  const clientAvatars = [assets.profile, assets.profile1, assets.profile2];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden bg-[#101826] text-white">
      {/* Subtle vignette instead of a purple gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 10%, rgba(176,141,87,0.10) 0%, rgba(16,24,38,0) 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "100% 44px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Left: copy */}
        <m.div variants={container} initial="hidden" animate="show">
          {/* Docket-style eyebrow */}
          <m.div
            variants={item}
            className="font-docket flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#C9A876]"
          >
            <span className="h-px w-8 bg-[#C9A876]/60" />
            File Ref — LZ / General Practice
          </m.div>

          {/* Headline */}
          <m.h1
            variants={item}
            className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-[3.6rem]"
          >
            Trusted Legal Representation Across Multiple{" "}
            <span className="text-[#C9A876]">Practice Areas</span>
          </m.h1>

          {/* Subtext */}
          <m.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
          >
            From property disputes to corporate advisory, our experienced legal
            team provides practical solutions tailored to your needs.
          </m.p>

          {/* Buttons */}
          <m.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/appointment")}
              className="flex cursor-pointer items-center gap-2 rounded-sm bg-[#C9A876] px-6 py-3 font-semibold text-[#101826] transition-colors duration-300 hover:bg-[#dbbb8c]"
            >
              Schedule a Consultation
              <ArrowRight size={18} />
            </m.button>

            <div className="flex items-center gap-2.5 text-sm italic text-white/70">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              Free Initial Consultation Available
            </div>
          </m.div>

          {/* Citation-style divider */}
          <m.div
            variants={item}
            className="mt-14 border-t border-white/10 pt-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {clientAvatars.map((imgSrc, index) => (
                  <img
                    key={index}
                    className="size-9 rounded-full border-2 border-[#101826] object-cover"
                    src={imgSrc}
                    alt="Client"
                  />
                ))}
              </div>
              <span className="font-docket text-xs tracking-wide text-white/50">
                10+ YEARS COMBINED LEGAL EXPERIENCE
              </span>
            </div>
          </m.div>
        </m.div>

        {/* Right: framed image slideshow + seal */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="relative"
        >
          <div className="border border-[#C9A876]/30 bg-[#16223a] p-2.5">
            <HeroImageSlideshow
              images={[assets.hero, assets.hero2, assets.hero3]}
              alt="Legal Consultation"
            />
          </div>

          {/* Seal / stamp — signature element */}
          <m.div
            initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="absolute -bottom-8 -left-8 hidden size-32 sm:block"
          >
            <svg viewBox="0 0 200 200" className="size-full drop-shadow-lg">
              <defs>
                <path
                  id="sealArc"
                  d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                />
              </defs>
              <circle cx="100" cy="100" r="96" fill="#F3EEE2" />
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="none"
                stroke="#C9A876"
                strokeWidth="3"
              />
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#C9A876"
                strokeWidth="1"
              />
              <text
                fill="#101826"
                fontSize="11.5"
                letterSpacing="2"
                className="font-docket"
              >
                <textPath href="#sealArc" startOffset="0%">
                  LAWZRA · TRUSTED COUNSEL · SINCE 2016 ·
                </textPath>
              </text>
              <text
                x="100"
                y="94"
                textAnchor="middle"
                fill="#101826"
                fontSize="34"
                className="font-display"
              >
                10+
              </text>
              <text
                x="100"
                y="116"
                textAnchor="middle"
                fill="#6B1F2A"
                fontSize="10.5"
                letterSpacing="2"
                className="font-docket"
              >
                YEARS
              </text>
            </svg>
          </m.div>
        </m.div>
      </div>

      {/* Credentials strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#0C1420]">
        <div className="font-docket mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-4 text-center text-[11px] uppercase tracking-[0.15em] text-white/40">
          <span>Serving Clients Across Nigeria</span>
          <span className="text-[#C9A876]/50">|</span>
          <span>Committed to Excellence</span>
          <span className="text-[#C9A876]/50">|</span>
          <span>Integrity</span>
          <span className="text-[#C9A876]/50">|</span>
          <span>Results</span>
          <span className="text-[#C9A876]/50">|</span>
          <span>Member, Nigerian Bar Association</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
