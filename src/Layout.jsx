import { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Nav from "./component/home/Nav";
import Footer from "./component/home/Footer";
import LoadingBar from "./component/LoadingBar";
import ScrollToTop from "./component/ScrollToTop";
import WhatsAppButton from "./component/WhatsAppButton";
import ScrollToTopOnNavigate from "./component/ScrollToTopOnNavigate";
import CookieConsent from "./component/cookieConsent";
import SmoothScroll from "./component/SmoothScroll.jsx";

const Layout = () => {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light",
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <HelmetProvider>
      <SmoothScroll>
        <Toaster position="top-center" reverseOrder={false} />
        <LazyMotion features={domAnimation}>
          <div className="dark:bg-primary relative min-h-screen">
            <LoadingBar />
            <ScrollToTopOnNavigate />
            <Nav theme={theme} setTheme={setTheme} />

            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  Loading...
                </div>
              }
            >
              <Outlet />
            </Suspense>

            <Footer />
            <CookieConsent />
            <ScrollToTop />
            <WhatsAppButton />
          </div>
        </LazyMotion>
      </SmoothScroll>
    </HelmetProvider>
  );
};

export default Layout;
