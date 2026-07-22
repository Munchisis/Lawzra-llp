import { Routes, Route, useLocation } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
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
import InsightsArchivePage from "./Pages/InsightsArchivePage";
import PracticeAreaPage from "./Pages/PracticeAreaPage";

// lazy load all Pages and heavy Practice Area components
const Home = lazy(() => import("./Pages/home"));
const AboutUs = lazy(() => import("./Pages/AboutUsPage"));
const ContactUs = lazy(() => import("./Pages/ContactUsPage"));
const OurTeam = lazy(() => import("./Pages/OurTeamPage"));
const Insights = lazy(() => import("./Pages/InsightsArchivePage"));
const Insight = lazy(() => import("./component/home/insight"));
const Careers = lazy(() => import("./Pages/CareersPage"));

const PracticeAreas = lazy(() => import("./Pages/PracticeAreaPage"));
const PracticeDetails = lazy(() => import("./Pages/PracticeDetails"));


// const Banking = lazy(() => import("./component/Practice/Banking"));
// const Tax = lazy(() => import("./component/Practice/Tax"));
// const RealEstate = lazy(() => import("./component/Practice/real-estate"));
// const IP = lazy(() => import("./component/Practice/IP"));
// const Energy = lazy(() => import("./component/Practice/Energy"));
// const Corporate = lazy(() => import("./component/Practice/Corporate"));
// const Privacy = lazy(() => import("./component/Practice/Privacy"));
// const Tech = lazy(() => import("./component/Practice/Tech"));
// const Dispute = lazy(() => import("./component/Practice/Dispute"));

const Appointment = lazy(() => import("./component/home/appointment"));
const SuccessPage = lazy(() => import("./component/SuccessPage"));
const PrivacyPolicy = lazy(() => import("./Pages/privacyPolicy"));
const TermsOfService = lazy(() => import("./Pages/termsOfService"));
const CookiePolicy = lazy(() => import("./Pages/cookiePolicy"));


// const NotFound = lazy(() => import("./component/not-found"));

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

          {/* mode="wait" ensures the old page finishes leaving before the new one starts entering */}
          
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  Loading...
                </div>
              }
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insight" element={<InsightsArchivePage />} />
                <Route path="/careers" element={<Careers />} />
              
              

                {/* Full-page Practice Area Routes */}
              <Route path="/areas-of-practice" element={<PracticeAreaPage />} />
              <Route path="/areas-of-practice/:slug" element={<PracticeDetails />} />
              
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/success-page" element={<SuccessPage />} />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />

                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Suspense>
      
          <Footer />
          <CookieConsent />

          {/* Floating Elements */}
          <ScrollToTop />
          <WhatsAppButton />
        </div>
      </LazyMotion>
    </>
  );
};

export default App;
