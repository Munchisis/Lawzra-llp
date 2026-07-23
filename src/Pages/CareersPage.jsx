import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { m } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import JobOpenings from "../component/JobOpenings";
import LifeAtLawzra from "../component/LifeAtLawzra";
import AnimatedPage from "../component/AnimatedPage";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CareersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const captchaToken = captchaRef.current.getResponse();

    if (!captchaToken) {
      toast.error("Please complete the captcha challenge.");
      return;
    }

    // --- File Validation ---
    const file = formData.get("attachment");
    if (file && file.size > 0) {
      const maxSize = 4 * 1024 * 1024; // kept under Vercel's serverless body-size limit
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (file.size > maxSize) {
        toast.error("File is too large! Maximum size is 4MB.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a PDF or Word document.");
        return;
      }
    }

    setIsSubmitting(true);
    formData.append("cf-turnstile-response", captchaToken);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        event.target.reset();
        captchaRef.current.reset(); // Reset widget after success
        navigate("/success-page");
      } else {
        toast.error(data.message || "Submission failed.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };
  const clientAvatars = [assets.profile3, assets.profile2, assets.profile];

  return (
    <AnimatedPage>
      {/* Visual Header Section */}
      <m.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <LifeAtLawzra />
      </m.section>

      <section className="relative flex min-h-screen flex-col items-center justify-center mb-6 gap-12 overflow-hidden bg-[#FAF8F3] px-6 py-16 dark:bg-[#101826] md:flex-row lg:gap-20">
        {/* Pulsing Background Glow */}
        <m.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A876]/10 blur-[120px]"
        />

        {/* Left Content */}
        <m.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="z-10 text-center md:text-left"
        >
          <div className="mx-auto flex w-fit items-center rounded-full border border-[#C9A876]/30 bg-[#0C1420] p-1.5 text-xs md:mx-0">
            <div className="mr-4 flex items-center -space-x-3">
              {clientAvatars.map((imgSrc, index) => (
                <img
                  key={index}
                  className="size-8 rounded-full border-2 border-[#0C1420] object-cover"
                  src={imgSrc}
                  alt="Team member"
                />
              ))}
            </div>
            <p className="pr-2 text-white/80">
              Join community of legal professionals
            </p>
          </div>

          <h1 className="font-display mx-auto mt-6 max-w-xl text-4xl font-medium leading-tight text-[#101826] dark:text-white md:mx-0 md:text-5xl">
            Interested in joining the{" "}
            <span className="text-[#C9A876]">Lawzra</span> team?
          </h1>

          <div className="mx-auto mt-8 max-w-md space-y-4 text-[#4B5262] dark:text-white/60 md:mx-0">
            <p className="text-sm leading-relaxed">
              Thank you for your interest in joining our organisation. Please
              complete the form and upload your CV and cover letter.
            </p>
            <p className="font-docket border-l-2 border-[#C9A876] pl-4 text-sm not-italic">
              Issues submitting? Email us at{" "}
              <span className="font-semibold text-[#B08D57] dark:text-[#C9A876]">
                careers@lawzra.com
              </span>
            </p>
          </div>
        </m.div>

        {/* Right Form */}
        <m.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="z-10 w-full max-w-lg rounded-sm border border-[#C9A876]/20 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#16223a]"
        >
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="font-docket mb-2 block text-xs uppercase tracking-widest text-[#4B5262] dark:text-white/50">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ola Oluwajayi"
                className="w-full rounded-sm border border-[#C9A876]/25 bg-[#FAF8F3] px-4 py-3 text-[#101826] outline-none transition focus:border-[#C9A876] dark:border-white/10 dark:bg-[#101826] dark:text-white dark:focus:border-[#C9A876]"
              />
            </div>

            <div>
              <label className="font-docket mb-2 block text-xs uppercase tracking-widest text-[#4B5262] dark:text-white/50">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="oluwajayi@example.com"
                className="w-full rounded-sm border border-[#C9A876]/25 bg-[#FAF8F3] px-4 py-3 text-[#101826] outline-none transition focus:border-[#C9A876] dark:border-white/10 dark:bg-[#101826] dark:text-white dark:focus:border-[#C9A876]"
              />
            </div>

            <div>
              <label className="font-docket mb-2 block text-xs uppercase tracking-widest text-[#4B5262] dark:text-white/50">
                Upload CV (PDF, DOC)
              </label>
              <input
                type="file"
                name="attachment"
                accept=".pdf,.doc,.docx"
                className="w-full cursor-pointer text-sm text-[#4B5262] file:mr-4 file:cursor-pointer file:rounded-sm file:border-0 file:bg-[#C9A876]/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#B08D57] hover:file:bg-[#C9A876]/25 dark:text-white/50 dark:file:text-[#C9A876]"
              />
            </div>

            <div>
              <label className="font-docket mb-2 block text-xs uppercase tracking-widest text-[#4B5262] dark:text-white/50">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about yourself..."
                rows="3"
                required
                className="w-full resize-none rounded-sm border border-[#C9A876]/25 bg-[#FAF8F3] px-4 py-3 text-[#101826] outline-none transition focus:border-[#C9A876] dark:border-white/10 dark:bg-[#101826] dark:text-white dark:focus:border-[#C9A876]"
              ></textarea>
            </div>

            <div className="flex justify-center py-2 md:justify-start">
              <Turnstile
                ref={captchaRef}
                siteKey={import.meta.env.VITE_TURNSTILE_SITEKEY}
                options={{ theme: "dark" }}
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <p className="text-xs text-[#4B5262]/70 dark:text-white/40">
                By applying, you agree to our{" "}
                <span className="cursor-pointer underline">Privacy Policy</span>
                .
              </p>

              <m.button
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#C9A876] px-10 py-3 font-bold text-[#101826] shadow-lg transition-all hover:bg-[#dbbb8c] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin text-[#101826]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Apply Now"
                )}
              </m.button>
            </div>
          </form>
        </m.div>
      </section>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto mb-20 w-full max-w-4xl rounded-sm border border-[#C9A876]/20 px-6">
          <JobOpenings />
        </div>
      </m.div>
    </AnimatedPage>
  );
};

export default CareersPage;
