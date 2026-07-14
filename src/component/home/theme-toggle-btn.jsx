import { Moon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggleBtn = ({ theme, setTheme }) => {
  const [isFixed, setIsFixed] = useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 48);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set initial theme (ONLY once)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferredTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(preferredTheme ? "dark" : "light");
    }
  }, [setTheme]);

  // Apply theme to document
  useEffect(() => {
    if (!theme) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className={`cursor-pointer rounded-full border p-2 transition-all duration-300
        ${
          !isFixed
            ? "border-transparent text-white/80 hover:border-[#C9A876] hover:text-[#C9A876]"
            : "border-[#C9A876]/30 text-[#4B5262] hover:border-[#C9A876] hover:text-[#B08D57] dark:border-white/15 dark:text-white/70 dark:hover:border-[#C9A876] dark:hover:text-[#C9A876]"
        }
        `}
    >
      {theme === "dark" ? <Moon size={18} /> : <SunIcon size={18} />}
    </button>
  );
};

export default ThemeToggleBtn;
