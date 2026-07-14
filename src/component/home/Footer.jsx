import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { m } from "framer-motion";
import { Github, Linkedin, Instagram, Send, XIcon } from "lucide-react";

const Footer = ({ theme }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="border-t border-[#C9A876]/15 bg-[#FAF8F3] transition-colors duration-300 dark:border-white/10 dark:bg-[#0C1420]">
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full px-6 pt-16 text-sm text-[#4B5262] dark:text-white/50 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="mb-16 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand & Socials */}
          <m.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link to="/" className="group mb-6 flex items-center gap-4">
              <m.img
                whileHover={{ rotate: 8, scale: 1.1 }}
                src={theme === "dark" ? assets.logoW : assets.logo}
                alt="Lawzra Logo"
                sizes="55px"
                className="h-14 w-14 object-contain transition-transform"
              />
              <div className="font-display text-lg tracking-tight text-[#101826] transition-colors group-hover:text-[#B08D57] dark:text-white dark:group-hover:text-[#C9A876]">
                Lawzra <span className="text-[#C9A876]">LLP</span>
              </div>
            </Link>
            <p className="max-w-sm leading-relaxed">
              Leading the way in legal excellence, we are committed to providing
              unparalleled legal services with integrity, expertise, and
              personalized attention to every client.
            </p>

            <div className="mt-8 flex gap-4">
              {[
                { icon: <XIcon size={17} />, href: "https://x.com" },
                { icon: <Github size={17} />, href: "https://github.com" },
                { icon: <Linkedin size={17} />, href: "https://linkedin.com" },
                {
                  icon: <Instagram size={17} />,
                  href: "https://instagram.com",
                },
              ].map((social, i) => (
                <m.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="rounded-full border border-[#C9A876]/25 bg-white p-2 text-[#4B5262] transition-colors hover:border-[#C9A876] hover:text-[#B08D57] dark:border-white/10 dark:bg-[#16223a] dark:text-white/60 dark:hover:border-[#C9A876] dark:hover:text-[#C9A876]"
                >
                  {social.icon}
                </m.a>
              ))}
            </div>
          </m.div>

          {/* Column 2: Quick Links */}
          <m.div
            variants={itemVariants}
            className="flex flex-col lg:items-center"
          >
            <div className="flex flex-col space-y-4">
              <h2 className="font-docket mb-2 text-xs uppercase tracking-[0.2em] text-[#101826] dark:text-white">
                Company
              </h2>
              <FooterLink to="/about-us">About us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/contact-us">Contact us</FooterLink>
              <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
            </div>
          </m.div>

          {/* Column 3: Newsletter */}
          <m.div variants={itemVariants}>
            <h2 className="font-docket mb-5 text-xs uppercase tracking-[0.2em] text-[#101826] dark:text-white">
              Subscribe to Insights
            </h2>
            <div className="max-w-sm space-y-5">
              <p className="text-[#4B5262] dark:text-white/50">
                Stay updated with the latest legal developments and firm news.
              </p>
              <div className="group relative">
                <input
                  className="h-12 w-full rounded-sm border border-[#C9A876]/30 bg-white px-4 pr-12 shadow-sm outline-none transition-all focus:border-[#C9A876] dark:border-white/10 dark:bg-[#16223a] dark:focus:border-[#C9A876]"
                  type="email"
                  placeholder="Your email address"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm bg-[#C9A876] p-2 text-[#101826] transition-colors hover:bg-[#dbbb8c] active:scale-95">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </m.div>
        </div>

        {/* Bottom Copyright */}
        <m.div
          variants={itemVariants}
          className="font-docket flex flex-col items-center justify-between gap-4 border-t border-[#C9A876]/15 py-10 text-center text-[11px] uppercase tracking-widest text-[#4B5262]/70 dark:border-white/10 dark:text-white/40 md:flex-row"
        >
          <p>© {new Date().getFullYear()} Lawzra LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-default">Lagos</span>
            <span className="cursor-default">Abuja</span>
            <span className="cursor-default">Umuahia</span>
          </div>
        </m.div>
      </m.div>
    </footer>
  );
};

// Helper Component for consistency
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="inline-block text-[#4B5262] transition-all hover:translate-x-1 hover:text-[#B08D57] dark:text-white/50 dark:hover:text-[#C9A876]"
  >
    {children}
  </Link>
);

export default Footer;
