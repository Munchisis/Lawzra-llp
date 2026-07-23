import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";

import Nav from "./component/home/Nav";
import Footer from "./component/home/Footer";
import LoadingBar from "./component/LoadingBar";
import ScrollToTop from "./component/ScrollToTop";
import WhatsAppButton from "./component/WhatsAppButton";
import ScrollToTopOnNavigate from "./component/ScrollToTopOnNavigate";
import CookieConsent from "./component/cookieConsent";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Lazy load all main components and pages cleanly
const Home = lazy(() => import("./Pages/home"));
const AboutUs = lazy(() => import("./Pages/AboutUsPage"));
const ContactUs = lazy(() => import("./Pages/ContactUsPage"));
const Careers = lazy(() => import("./Pages/CareersPage"));

// Dynamic Team Page Engine splits
const OurTeamPage = lazy(() => import("./Pages/OurTeamPage"));
const TeamDetailsPage = lazy(() => import("./Pages/TeamDetailsPage"));

// Dynamic Practice Area splits
const PracticeAreaPage = lazy(() => import("./Pages/PracticeAreaPage"));
const PracticeDetails = lazy(() => import("./Pages/PracticeDetails"));

// Insights, Articles and Blog archives layout splits
const Insights = lazy(() => import("./Pages/InsightsArchivePage"));
const InsightsArchivePage = lazy(() => import("./Pages/InsightsArchivePage"));
const Insight = lazy(() => import("./component/home/insight"));

// Form Utility and Corporate compliance sheets
const Appointment = lazy(() => import("./component/home/appointment"));
const SuccessPage = lazy(() => import("./component/SuccessPage"));
const PrivacyPolicy = lazy(() => import("./Pages/privacyPolicy"));
const TermsOfService = lazy(() => import("./Pages/termsOfService"));
const CookiePolicy = lazy(() => import("./Pages/cookiePolicy"));
const NotFound = lazy(() => import("./component/not-found"));

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <LazyMotion features={domAnimation}>
        <div className="dark:bg-primary relative min-h-screen">
          <LoadingBar />
          <ScrollToTopOnNavigate />
          <Nav theme={theme} setTheme={setTheme} />

          {/* Suspense fallback component watches client-side route transitions fluidly */}
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center bg-[#FAF8F3] text-sm tracking-widest text-[#B08D57] uppercase dark:bg-[#101826]">
                Loading...
              </div>
            }
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />

              {/* Dynamic Professional Team Routes Setup */}
              <Route path="/our-team" element={<OurTeamPage />} />
              <Route path="/our-team/:slug" element={<TeamDetailsPage />} />

              {/* Legal Insights, Blogs and Articles Routes */}
              <Route path="/insights" element={<Insights />} />
              <Route path="/insight" element={<InsightsArchivePage />} />
              <Route path="/careers" element={<Careers />} />

              {/* Full-page Dynamic Practice Area Routes */}
              <Route path="/areas-of-practice" element={<PracticeAreaPage />} />
              <Route
                path="/areas-of-practice/:slug"
                element={<PracticeDetails />}
              />

              {/* Utility Scheduler and Booking pipelines */}
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/success-page" element={<SuccessPage />} />

              {/* Policy Layout documents */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />

              {/* Catch-all 404 handler block rule */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
          <CookieConsent />

          {/* Floating Action Elements layout */}
          <ScrollToTop />
          <WhatsAppButton />
        </div>
      </LazyMotion>
    </>
  );
};

export default App;
