import React from "react";
import { Link } from "react-router-dom";

const SpeakToALawyer = () => {
  return (
    <div className="mb-10 mt-10">
      <h3 className="font-display p-5 text-center text-lg italic tracking-wide text-[#101826] dark:text-white/80">
        Need Legal Assistance? Let's Help You.
      </h3>

      {/* CTA */}
      <div className="p-5 text-center">
        <Link
          to="/appointment"
          className="inline-block rounded-sm bg-[#C9A876] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#101826] shadow-xl shadow-[#C9A876]/20 transition-all duration-300 hover:bg-[#dbbb8c] active:scale-95"
        >
          Schedule a Consultation
        </Link>
      </div>
    </div>
  );
};

export default SpeakToALawyer;
