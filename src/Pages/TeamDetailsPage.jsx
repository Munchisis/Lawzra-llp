import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Linkedin, Mail } from "lucide-react";
import { partnerInfo } from "../data/partnerData.js";
import AnimatedPage from "../component/AnimatedPage";

const SITE_URL = "https://lawzra.com";

const TeamDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const member = partnerInfo.find((m) => m.slug === slug);

  if (!member) {
    return (
      <AnimatedPage>
        <Helmet>
          <title>Profile Not Found | Lawzra LLP</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F3] dark:bg-[#101826]">
          <h2 className="font-display text-2xl text-[#101826] dark:text-white mb-4">
            Profile Not Located
          </h2>
          <button
            onClick={() => navigate("/our-team")}
            className="text-[#C9A876] hover:underline"
          >
            Back to Team Overview
          </button>
        </div>
      </AnimatedPage>
    );
  }

  const pageTitle = `${member.name} | Professional Bio | Lawzra LLP`;
  const pageDescription = `${member.name}, ${member.position} at Lawzra LLP. Read full legal achievements profile and consult options.`;
  const canonicalUrl = `${SITE_URL}/our-team/${member.slug}`;
  const imageUrl = member.image?.startsWith("http")
    ? member.image
    : `${SITE_URL}${member.image}`;

  // Person/Attorney structured data for rich results and E-E-A-T signals
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.position,
    description: pageDescription,
    image: imageUrl,
    url: canonicalUrl,
    worksFor: {
      "@type": "LegalService",
      name: "Lawzra LLP",
      url: SITE_URL,
    },
    email: member.email ? `mailto:${member.email}` : undefined,
    sameAs: member.linkedin ? [member.linkedin] : undefined,
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta
          property="profile:first_name"
          content={member.name?.split(" ")[0]}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#FAF8F3] pb-16 sm:pb-24 dark:bg-[#101826] pt-8 sm:pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <button
            onClick={() => navigate("/our-team")}
            className="font-docket flex items-center gap-2 text-xs uppercase tracking-widest text-[#B08D57] hover:text-[#101826] dark:text-[#C9A876] dark:hover:text-white mb-8 sm:mb-12"
          >
            <ArrowLeft size={14} /> All Professionals
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Sidebar Visual Card block */}
            <div className="lg:col-span-1 lg:sticky lg:top-6 max-w-xs mx-auto w-full sm:max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-sm border border-[#C9A876]/20 bg-white p-4 dark:bg-[#16223a] shadow-xs">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.position} at Lawzra LLP`}
                  className="w-full h-auto object-cover rounded-xs"
                />
                <div className="mt-4 pt-4 border-t border-[#C9A876]/10 text-center">
                  <h3 className="font-display text-lg text-[#101826] dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#B08D57] dark:text-[#C9A876] uppercase tracking-wider mt-1">
                    {member.position}
                  </p>

                  <div className="flex items-center justify-center gap-4 mt-4 text-[#B08D57] dark:text-[#C9A876]">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#101826] dark:hover:text-white transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-[#101826] dark:hover:text-white transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative text layouts rendering the longDesc array */}
            <div className="lg:col-span-2">
              <header className="border-b border-[#C9A876]/20 pb-4 sm:pb-6 mb-6 sm:mb-8 text-center lg:text-left">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#101826] dark:text-white mb-2 break-words">
                  {member.name}
                </h1>
                <p className="text-[#B08D57] dark:text-[#C9A876] font-sans text-sm sm:text-base">
                  {member.title}
                </p>
              </header>

              {/* Renders the full multi-line detailed essay segments dynamically */}
              <div className="text-sm sm:text-base leading-relaxed text-[#4B5262] dark:text-white/75 space-y-4 sm:space-y-6">
                {member.longDesc.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Call to action panel */}
              <div className="mt-8 sm:mt-12 p-5 sm:p-8 border border-[#C9A876]/20 bg-[#16223a]/30 rounded-sm text-center lg:text-left">
                <h4 className="font-display text-base sm:text-lg text-[#101826] dark:text-white mb-2">
                  Book Counsel with {member.name}
                </h4>
                <p className="text-sm text-[#4B5262]/80 dark:text-white/60 mb-4">
                  Set up a private session directly to align litigation
                  parameters or advisory operations with our partners.
                </p>
                <button
                  onClick={() => navigate("/appointment")}
                  className="w-full sm:w-auto rounded-sm bg-[#C9A876] px-6 py-2.5 text-xs font-bold text-[#101826] uppercase tracking-wider hover:bg-[#dbbb8c] cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default TeamDetailsPage;
