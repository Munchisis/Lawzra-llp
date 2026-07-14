import { useState } from "react";
import { ChevronDown, MapPin, Briefcase, Clock } from "lucide-react";
import { m } from "framer-motion";

const openings = [
  {
    id: 1,
    title: "Senior Associate (Corporate Law)",
    location: "Lagos, NG",
    type: "Full-time",
    experience: "5-7 Years",
    description:
      "We are seeking a highly experienced Senior Associate to lead corporate transactions, mergers, and acquisitions. You will be responsible for advising high-net-worth clients and managing junior associates.",
  },
  {
    id: 2,
    title: "Legal Intern",
    location: "Abuja / Remote",
    type: "Internship",
    experience: "Entry Level",
    description:
      "Perfect for recent LL.B graduates. You will assist in legal research, drafting court processes, and attending client meetings under the supervision of our Partners.",
  },
  {
    id: 3,
    title: "Litigation Specialist",
    location: "Umuahia, NG",
    type: "Contract",
    experience: "3+ Years",
    description:
      "Focusing on civil and commercial litigation. The ideal candidate must have a proven track record in Nigerian courts and exceptional advocacy skills.",
  },
];

const JobOpenings = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#FAF8F3] px-6 m-8 py-20 dark:bg-[#101826]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="font-docket mb-4 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#B08D57] dark:text-[#C9A876]">
            <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
            Now Hiring
            <span className="h-px w-8 bg-[#B08D57]/60 dark:bg-[#C9A876]/60" />
          </div>
          <h2 className="font-display mb-4 text-3xl text-[#101826] dark:text-white md:text-4xl">
            Current Openings
          </h2>
          <p className="text-[#4B5262] dark:text-white/50">
            Select a role to view requirements. If you don't see a fit, use
            the form above for a general application.
          </p>
        </div>

        <div className="space-y-4">
          {openings.map((job) => (
            <div
              key={job.id}
              className={`overflow-hidden rounded-sm border transition-all duration-300 ${
                activeId === job.id
                  ? "border-[#C9A876] bg-white shadow-[0_0_20px_rgba(201,168,118,0.15)] dark:bg-white/5"
                  : "border-[#C9A876]/20 bg-white hover:bg-[#FAF8F3] dark:border-white/10 dark:bg-transparent dark:hover:bg-white/5"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => toggleAccordion(job.id)}
                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex-1">
                  <h3 className="font-display mb-2 text-xl text-[#101826] dark:text-white">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-[#4B5262] dark:text-white/40">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#B08D57] dark:text-[#C9A876]" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} className="text-[#B08D57] dark:text-[#C9A876]" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[#B08D57] dark:text-[#C9A876]" /> {job.experience}
                    </span>
                  </div>
                </div>
                <m.div
                  animate={{ rotate: activeId === job.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-[#4B5262] dark:text-white/40" />
                </m.div>
              </button>

              {/* Expandable Content */}
              <>
                {activeId === job.id && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#C9A876]/15 px-6 pb-8 pt-4 text-sm leading-relaxed text-[#4B5262] dark:border-white/10 dark:text-white/60">
                      <p className="mb-6">{job.description}</p>
                      <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="font-docket flex items-center gap-2 text-xs uppercase tracking-wide text-[#B08D57] transition-colors hover:text-[#8A6A38] dark:text-[#C9A876] dark:hover:text-[#dbbb8c]"
                      >
                        Apply for this position ↑
                      </button>
                    </div>
                  </m.div>
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOpenings;
