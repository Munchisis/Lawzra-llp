import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
// Pulling full details array from your unified data file
import { practiceAreasData } from "../data/practiceData";
import AnimatedPage from "../component/AnimatedPage";

const PracticeDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the exact practice data object matching the active URL slug
  const practice = practiceAreasData.find((p) => p.slug === slug);

  // Fallback 404 block if a visitor enters an invalid sub-route manually
  if (!practice) {
    return (
      <AnimatedPage>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F3] px-4 text-center dark:bg-[#101826]">
          <h2 className="font-display mb-4 text-2xl font-medium text-[#101826] dark:text-white">
            Practice Area Not Found
          </h2>
          <button
            onClick={() => navigate("/areas-of-practice")}
            className="font-docket flex cursor-pointer items-center gap-2 text-xs uppercase tracking-wider text-[#B08D57] hover:text-[#dbbb8c] dark:text-[#C9A876]"
          >
            <ArrowLeft size={16} /> Return to practice areas
          </button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-[#FAF8F3] pb-24 dark:bg-[#101826]">
        {/* Navigation Step-Back Banner Area */}
        <div className="mx-auto max-w-4xl px-6 pt-12">
          <button
            onClick={() => navigate("/areas-of-practice")}
            className="font-docket flex cursor-pointer items-center gap-2 text-xs uppercase tracking-widest text-[#B08D57] transition-colors hover:text-[#101826] dark:text-[#C9A876] dark:hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Overview
          </button>
        </div>

        {/* Main Content Layout Container */}
        <article className="mx-auto mt-8 max-w-4xl px-6">
          {/* Featured Hero Banner Image element */}
          <div className="relative h-64 w-full overflow-hidden rounded-sm border border-[#C9A876]/20 sm:h-[45vh]">
            <img
              src={practice.image}
              alt={practice.title}
              className="h-full w-full object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#101826]/30 via-transparent to-transparent" />
          </div>

          {/* Heading Title Block */}
          <header className="mt-10 border-b border-[#C9A876]/20 pb-6">
            <h1 className="font-display text-3xl font-medium tracking-tight text-[#101826] sm:text-5xl dark:text-white">
              {practice.title}
            </h1>
          </header>

          {/* Primary Core Paragraph Service Description */}
          <div className="mt-8 text-lg leading-relaxed text-[#101826]/80 dark:text-white/80">
            <p>{practice.description}</p>
          </div>

          {/* Specific Expertise Checklist Section Loop */}
          {practice.expertise && practice.expertise.length > 0 && (
            <div className="mt-16">
              <div className="font-docket mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[#B08D57] dark:text-[#C9A876]">
                Our Specific Core Expertise
                <span className="h-px flex-1 bg-[#C9A876]/20" />
              </div>

              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {practice.expertise.map((item, index) => {
                  // Isolates bold topic header terms cleanly from the body paragraph details via colon parsing
                  const parts = item.split(":");
                  const hasTitle = parts.length > 1;

                  return (
                    <li
                      key={index}
                      className="flex items-start gap-4 rounded-sm border border-[#C9A876]/10 bg-white p-5 shadow-xs transition-colors hover:border-[#C9A876]/30 dark:border-white/5 dark:bg-[#16223a]"
                    >
                      <div className="mt-0.5 shrink-0">
                        <CheckCircle2
                          size={18}
                          className="text-[#B08D57] dark:text-[#C9A876]"
                        />
                      </div>

                      <span className="text-sm leading-relaxed text-[#101826]/80 dark:text-white/75">
                        {hasTitle ? (
                          <>
                            <strong className="block font-display text-base font-medium text-[#101826] dark:text-white mb-1">
                              {parts[0]}
                            </strong>
                            {parts.slice(1).join(":")}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </article>

        {/* Dynamic Context Footer Call to Action Panel */}
        <section className="mx-auto mt-24 max-w-4xl rounded-sm border border-[#C9A876]/20 bg-[#0C1420] p-12 px-6 text-center text-white">
          <h2 className="font-display mb-4 text-2xl">
            Discuss Your {practice.title} Matter
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-white/60">
            Get in touch with our specialized partners to align strategic
            mitigation and advisory approaches for your legal portfolio
            objectives.
          </p>
          <button
            onClick={() => navigate("/appointment")}
            className="cursor-pointer rounded-sm bg-[#C9A876] px-10 py-4 font-bold text-[#101826] shadow-lg transition-all hover:bg-[#dbbb8c] active:scale-95"
          >
            Schedule a Consultation
          </button>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default PracticeDetails;
