import { m } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

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
        
        <h1 className="text-3xl font-serif text-slate-900 dark:text-white mb-4">Submission Successful</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you for reaching out. A member of our team will contact you shortly.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-4 bg-slate-900 dark:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          <Home size={18} />
          Back to Homepage
        </button>
      </m.div>
    </div>
  );
};

export default SuccessPage;
