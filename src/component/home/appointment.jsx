import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { m } from "framer-motion";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import OperatingHours from "../OperatingHours";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const captchaRef = useRef(null); // Create a ref for the captcha
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onHCaptchaChange = (token) => {
    setValue("h-captcha-response", token); // Store token in form data
  };

  const onSubmit = async (data) => {
    if (!data["h-captcha-response"]) {
      toast.error("Please complete the captcha challenge");
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append(
        "access_key",
        import.meta.env.VITE_WEB3FORMS_APPOINTMENT_KEY,
      );

      // Append all fields, including the 'h-captcha-response
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        reset();
        navigate("/success-page");
        captchaRef.current?.resetCaptcha(); // Reset widget for next use
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast.success(result.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col bg-[#FAF8F3] dark:bg-[#101826] lg:flex-row">
      {/* Left Side Content */}
      <m.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-[#0C1420] p-16 lg:flex"
      >
        <div className="z-10">
          <h2 className="font-docket mb-4 text-sm uppercase tracking-widest text-[#C9A876]">
            Private Counsel
          </h2>
          <h1 className="font-display text-5xl leading-tight text-white">
            Expert Legal <br />
            <span className="italic text-white/50">Advocacy.</span>
          </h1>
        </div>

        <div className="w-full">
          <OperatingHours />
        </div>

        <div className="z-10 space-y-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-[#C9A876]" size={24} />
            <div>
              <h4 className="font-semibold text-white">
                Attorney-Client Privilege
              </h4>
              <p className="text-sm text-white/50">
                All consultations are strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </m.div>

      {/* Right Side Form */}
      <div className="flex flex-1 items-center justify-center p-4 md:p-12">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-xl rounded-sm border border-[#C9A876]/20 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#16223a] md:p-10"
        >
          <div className="mb-8 text-center lg:text-left">
            <h1 className="font-display text-2xl text-[#101826] dark:text-white md:text-3xl">
              Book a Consultation
            </h1>
            <p className="mt-1 text-sm text-[#4B5262] dark:text-white/50">
              Lawzra Partnership Legal Services
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5"
          >
            {/* Full Name */}
            <div>
              <label className="font-docket mb-1 block text-[10px] uppercase tracking-wide text-[#4B5262] dark:text-white/50">
                Full Legal Name
              </label>
              <input
                {...register("fullName", { required: true })}
                type="text"
                placeholder="e.g. Chidi Okechukwu"
                className={`w-full rounded-sm border bg-[#FAF8F3] px-4 py-3 text-sm text-[#101826] outline-none dark:bg-[#101826] dark:text-white ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-[#C9A876]/25 focus:border-[#C9A876] dark:border-white/10 dark:focus:border-[#C9A876]"
                }`}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="font-docket mb-1 block text-[10px] uppercase tracking-wide text-[#4B5262] dark:text-white/50">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full rounded-sm border bg-[#FAF8F3] px-4 py-3 text-sm text-[#101826] outline-none dark:bg-[#101826] dark:text-white ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#C9A876]/25 focus:border-[#C9A876] dark:border-white/10 dark:focus:border-[#C9A876]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[10px] font-semibold text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-docket mb-1 block text-[10px] uppercase tracking-wide text-[#4B5262] dark:text-white/50">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+]+$/, // Allows only numbers and the '+' sign
                      message:
                        "Please enter a valid phone number (digits only)",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                  })}
                  type="tel"
                  inputMode="numeric"
                  placeholder="+234..."
                  className={`w-full rounded-sm border bg-[#FAF8F3] px-4 py-3 text-sm text-[#101826] outline-none dark:bg-[#101826] dark:text-white ${
                    errors.phone
                      ? "border-red-500"
                      : "border-[#C9A876]/25 focus:border-[#C9A876] dark:border-white/10 dark:focus:border-[#C9A876]"
                  }`}
                />
                {/* Display Error Message */}
                {errors.phone && (
                  <p className="mt-1 text-[10px] font-semibold text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Practice Area */}
            <div>
              <label className="font-docket mb-1 block text-[10px] uppercase tracking-wide text-[#4B5262] dark:text-white/50">
                Area of Practice
              </label>
              <select
                {...register("practiceArea")}
                className="w-full appearance-none rounded-sm border border-[#C9A876]/25 bg-[#FAF8F3] px-4 py-3 text-sm text-[#101826] outline-none dark:border-white/10 dark:bg-[#101826] dark:text-white/60"
              >
                <option>Corporate/Commercial Law</option>
                <option>Dispute Resolution</option>
                <option>Real Estate & Construction</option>
                <option>Family & Probate</option>
                <option>Not specified</option>
              </select>

              {/* Legal Matter Description */}
              <div className="md:col-span-2">
                <label className="font-docket mb-1 mt-4 block text-[10px] uppercase tracking-wide text-[#4B5262] dark:text-white/50">
                  Brief Description of Matter
                </label>
                <textarea
                  {...register("message", {
                    required: "Please provide a brief overview of your case",
                    minLength: {
                      value: 20,
                      message:
                        "Please provide a bit more detail (min 20 characters)",
                    },
                  })}
                  rows={4}
                  placeholder="Describe your legal situation..."
                  className={`w-full resize-none rounded-sm border bg-[#FAF8F3] px-4 py-3 text-sm text-[#101826] outline-none transition-all dark:bg-[#101826] dark:text-white ${
                    errors.message
                      ? "border-red-500"
                      : "border-[#C9A876]/25 focus:border-[#C9A876] dark:border-white/10 dark:focus:border-[#C9A876]"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[10px] font-semibold italic text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center py-2 md:justify-start">
              <HCaptcha
                ref={captchaRef}
                sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
                onVerify={onHCaptchaChange}
                theme="dark" // Matches your UI
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <m.button
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`flex w-full items-center justify-center gap-2 rounded-sm py-4 font-bold shadow-lg transition-all ${
                  isSuccess
                    ? "bg-green-500 text-white"
                    : "bg-[#C9A876] text-[#101826] hover:bg-[#dbbb8c]"
                }`}
              >
                {isSubmitting ? (
                  "Verifying & Sending..."
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={18} /> Request Sent!
                  </>
                ) : (
                  <>
                    <Calendar size={18} /> Schedule Meeting
                  </>
                )}
              </m.button>
            </div>
          </form>

          {/* Success Message Overlay */}
          {isSuccess && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-sm bg-[#FAF8F3]/95 p-8 text-center backdrop-blur-sm dark:bg-[#101826]/95"
            >
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
              <h3 className="font-display mb-2 text-2xl text-[#101826] dark:text-white">
                Request Sent
              </h3>
              <p className="text-sm text-[#4B5262] dark:text-white/60">
                We will contact you shortly to confirm your slot.
              </p>
            </m.div>
          )}
        </m.div>
      </div>
    </section>
  );
};

export default Appointment;
