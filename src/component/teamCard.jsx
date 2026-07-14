import { Linkedin, Mail, X } from "lucide-react";

const TeamCard = ({ image, name, email, position }) => {
  return (
    <div className="group w-72 overflow-hidden rounded-sm border border-[#C9A876]/20 bg-white pb-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A876] hover:shadow-2xl dark:border-white/10 dark:bg-[#16223a] md:w-80">
      {/* Image Wrapper with Zoom Effect */}
      <div className="relative h-72 overflow-hidden">
        <img
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          src={image}
          alt={name}
        />
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-[#0A0F18]/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col items-center px-6 text-center">
        {/* Name & Title */}
        <h3 className="font-display mt-5 text-lg leading-tight text-[#101826] dark:text-white">
          {name}
        </h3>
        <p className="font-docket mt-1 text-xs uppercase tracking-widest text-[#B08D57] dark:text-[#C9A876]">
          {position || "Legal Consultant"}
        </p>

        {/* Email Display */}
        <p className="mt-3 w-full truncate px-4 text-xs text-[#4B5262]/70 dark:text-white/40">
          {email}
        </p>

        {/* Social */}
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/"
            className="mt-6 flex items-center rounded-full border border-[#C9A876]/25 bg-[#FAF8F3] p-2.5 text-[#4B5262] shadow-sm transition-all hover:border-[#C9A876] hover:text-[#B08D57] active:scale-95 dark:border-white/10 dark:bg-[#101826] dark:text-white/60 dark:hover:border-[#C9A876] dark:hover:text-[#C9A876]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://www.x.com/"
            className="mt-6 flex items-center rounded-full border border-[#C9A876]/25 bg-[#FAF8F3] p-2.5 text-[#4B5262] shadow-sm transition-all hover:border-[#C9A876] hover:text-[#B08D57] active:scale-95 dark:border-white/10 dark:bg-[#101826] dark:text-white/60 dark:hover:border-[#C9A876] dark:hover:text-[#C9A876]"
          >
            <X className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
