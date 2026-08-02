import { m } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
 

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-500 w-12 h-12" />
        </div>

        <h1 className="text-3xl font-serif text-slate-900 dark:text-white mb-4">
          Submission Successful
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you for reaching out. A member of our team will contact you
          shortly.
        </p>

        <Link
          to="/"
          className="font-docket flex cursor-pointer items-center gap-2 text-xs uppercase tracking-wider text-secondary-assent hover:text-[#dbbb8c] dark:text-assent"
        >
          <Home size={18} />
          Back to Homepage
        </Link>
      </m.div>
    </div>
  );
};

export default SuccessPage;
