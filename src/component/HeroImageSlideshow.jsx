import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";


const HeroImageSlideshow = ({ images = [], interval = 6000 }) => {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // React to the user's motion preference changing mid-session, not just
  // on mount.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, prefersReducedMotion]);

  if (images.length === 0) return null;

  const current = images[index];

  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm sm:aspect-5/4 lg:aspect-4/5">
      <AnimatePresence mode="sync">
        <m.img
          key={index}
          src={current.src}
          alt={current.alt}
          width={800}
          height={1000}
          fetchpriority={index === 0 ? "high" : "auto"}
          loading={index === 0 ? "eager" : "lazy"}
          decoding={index === 0 ? "sync" : "async"}
          initial={index === 0 ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: index === 0 ? 0 : 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroImageSlideshow;
