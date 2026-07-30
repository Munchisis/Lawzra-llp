import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { m } from "framer-motion";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "essential");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-[#FAF8F3] dark:bg-[#16223a] border border-[#C9A876]/25 dark:border-white/10 shadow-2xl rounded-sm z-[100] p-5"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#C9A876]/10 dark:bg-[#C9A876]/15 p-2 rounded-sm text-[#B08D57] dark:text-[#C9A876] shrink-0">
              <Cookie size={20} />
            </div>

            <div className="flex-1">
              <h4 className="font-display text-sm font-semibold text-[#101826] dark:text-white mb-1">
                Your Privacy Matters to Us
              </h4>
              <p className="text-xs text-[#4B5262] dark:text-white/60 leading-relaxed">
                We use cookies to improve your browsing experience and
                understand how visitors use our site, in line with our{" "}
                <Link
                  to="/cookie-policy"
                  className="text-[#B08D57] dark:text-[#C9A876] hover:underline font-medium"
                >
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="text-[#B08D57] dark:text-[#C9A876] hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={acceptCookies}
                  className="font-docket bg-[#C9A876] hover:bg-[#dbbb8c] text-[#101826] text-xs px-6 py-2.5 rounded-sm font-bold uppercase tracking-wide transition-all active:scale-95 cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  onClick={declineCookies}
                  className="font-docket text-[#4B5262]/70 hover:text-[#101826] dark:text-white/50 dark:hover:text-white text-xs font-semibold uppercase tracking-wide px-2 py-2 transition-colors"
                >
                  Essential Only
                </button>
              </div>
            </div>

            <button
              onClick={declineCookies}
              aria-label="Dismiss and accept essential cookies only"
              className="text-[#4B5262]/60 hover:text-[#101826] dark:text-white/40 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </m.div>
      )}
    </>
  );
};

export default CookieConsent;
