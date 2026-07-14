import { MailIcon, MapPin, MenuIcon, PhoneCallIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { m } from "motion/react";
import { assets } from "../../assets/assets.js";
import ThemeToggleBtn from "./theme-toggle-btn.jsx";


const Nav = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Practice Areas", path: "/practice-areas" },
    { name: "Our Team", path: "/our-team" },
    { name: "Insights", path: "/insights" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants for Mobile Menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    opened: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full">

      {/* Top Banner */}
      <div className="font-docket bg-[#0C1420] py-2 text-white">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-widest md:text-xs">
          <p className="text-[#C9A876]">Free Consultation Available</p>
          <a
            href="tel:+2348037333930"
            className="flex items-center gap-1 text-white/70 hover:text-white"
          >
            <PhoneCallIcon size={13} /> +234 803 733 3930
          </a>
          <a
            href="mailto:info@lawzra.com"
            className="flex items-center gap-1 text-white/70 hover:text-white"
          >
            <MailIcon size={13} /> info@lawzra.com
          </a>
          <span className="hidden items-center gap-1 text-white/70 lg:flex">
            <MapPin size={13} /> Lekki Phase 1, Lagos
          </span>
        </div>
      </div>

      {/* Navbar */}
      <m.nav
        initial={false}
        animate={{
          backgroundColor: isFixed
            ? theme === "dark"
              ? "rgba(16, 24, 38, 0.95)"
              : "rgba(250, 248, 243, 0.95)"
            : "#101826",
          boxShadow: isFixed ? "0 4px 6px -1px rgb(0 0 0 / 0.15)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className={`flex h-20 items-center justify-between px-6 md:px-16 lg:px-24 z-50 
        ${isFixed ? "fixed top-0 left-0 w-full backdrop-blur-sm" : "relative bg-[#101826] text-white"}`}
      >
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <m.img
              key={isFixed ? "fixed" : "static"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              src={isFixed && theme !== "dark" ? assets.logo : assets.logoW}
              alt="Lawzra Logo"
              className="h-10 w-auto object-contain md:h-12"
            />
            <h1 className="font-display text-lg tracking-wide  dark:text-white/90">
              Lawzra <span className="text-[#C9A876]">LLP</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex lg:gap-10">
          {navLinks.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-[#C9A876]"
                    : isFixed
                      ? "text-[#4B5262] hover:text-[#B08D57] dark:text-white/70 dark:hover:text-[#C9A876]"
                      : "text-white/70 hover:text-[#C9A876]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        
            <button
              onClick={() => navigate("/contact-us")}
              className="group relative hidden overflow-hidden rounded-sm border border-[#C9A876] px-6 py-2 text-xs font-bold text-[#C9A876] transition-all active:scale-95 hover:bg-[#C9A876] hover:text-[#101826] md:block"
            >
              <span className="relative z-10">Get in touch</span>
            </button>

          {/* Mobile Toggle */}
          <button className="p-2 md:hidden" onClick={() => setOpen(!open)}>
            <m.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? (
                <X className={isFixed ? "text-[#101826] dark:text-white" : "text-white"} />
              ) : (
                <MenuIcon className={isFixed ? "text-[#101826] dark:text-white" : "text-white"} />
              )}
            </m.div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <>
          {open && (
            <m.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="absolute top-20 left-0 z-50 flex w-full flex-col overflow-hidden border-t border-[#C9A876]/20 bg-[#FAF8F3] p-6 shadow-xl dark:bg-[#101826] md:hidden"
            >
              {navLinks.map((link, i) => (
                <m.div variants={itemVariants} key={i}>
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-[#C9A876]/15 py-3 text-lg font-medium ${
                        isActive
                          ? "text-[#B08D57] dark:text-[#C9A876]"
                          : "text-[#4B5262] dark:text-white/70"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </m.div>
              ))}
              <m.button
                variants={itemVariants}
                onClick={() => {
                  navigate("/contact-us");
                  setOpen(false);
                }}
                className="mt-6 w-full rounded-sm bg-[#C9A876] py-3 font-bold text-[#101826]"
              >
                Get in touch
              </m.button>
            </m.div>
          )}
        </>
      </m.nav>

      {/* Spacer */}
      {isFixed && <div className="h-20" />}
    </div>
  );
};

export default Nav;
