import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * Crossfading image slideshow sized for the Hero's framed portrait box.
 * Drop-in replacement for a single <img>, same aspect-ratio classes.
 */
const HeroImageSlideshow = ({ images = [], interval = 6000, alt = "" }) => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, prefersReducedMotion]);

  if (images.length === 0) return null;

  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm sm:aspect-5/4 lg:aspect-4/5">
      <AnimatePresence mode="sync">
        <m.img
          key={index}
          src={images[index]}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroImageSlideshow;
