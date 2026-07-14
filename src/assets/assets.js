import hero from "./img/hero.AVIF";
import lawyer1 from "./img/Lawyer1.AVIF";
import lawyer2 from "./img/Lawyer2.AVIF";
import lawyer3 from "./img/lawyer3.AVIF";
import aboutUs4 from "./img/about-us-4.AVIF";
import aboutUs2 from "./img/aboutus2.AVIF";
import aboutUs from "./img/aboutus.AVIF";
import logo from "../../public/logo.png";
import logoW from "../../public/logoW.png";
import banking from "./img/banking.AVIF";
import corporate from "./img/corporate.AVIF";
import dispute from "./img/dispute.AVIF";
import energy from "./img/energy.AVIF";
import ip from "./img/ip.AVIF";
import ip2 from "./img/ip2.AVIF";
import media from "./img/media.AVIF";
import real_estate from "./img/real_estate.AVIF";
import tax from "./img/tax.AVIF";
import tax2 from "./img/tax2.AVIF";
import privacy from "./img/privacy.AVIF";
import tech from "./img/tech.AVIF";
import office1 from "./img/office1.AVIF";
import office2 from "./img/office2.AVIF";
import office3 from "./img/office3.AVIF";
import office4 from "./img/office4.AVIF";
import office5 from "./img/office5.AVIF";
import profile from "./img/profile.AVIF";
import profile1 from "./img/profile1.AVIF";
import profile2 from "./img/profile2.AVIF";
import profile3 from "./img/profile3.AVIF";
import custody from "./img/custody.AVIF";
import privacyPolicy from "./img/privacyPolicy.AVIF";
import cookiePolicy from "./img/cookiePolicy.AVIF";
import termsOfService from "./img/termsOfService.AVIF";

export const assets = {
  lawyer1,
  lawyer2,
  lawyer3,
  aboutUs4,
  aboutUs2,
  aboutUs,
  logo,
  logoW,
  hero,
  banking,
  corporate,
  dispute,
  energy,
  ip,
  privacy,
  real_estate,
  tax,
  tech,
  ip2,
  media,
  tax2,
  office1,
  office2,
  office3,
  office4,
  office5,
  profile,
  profile1,
  profile2,
  profile3,
  custody,
  privacyPolicy,
  cookiePolicy,
  termsOfService,
};

export const gallery = [
  {
    src: assets.office1,
    alt: "Modern Lagos Workspace",
    size: "col-span-2 row-span-2",
  },
  {
    src: assets.office2,
    alt: "Collaborative Strategy Session",
    size: "col-span-1 row-span-1",
  },
  {
    src: assets.office3,
    alt: "Annual Legal Symposium",
    size: "col-span-1 row-span-1",
  },
  {
    src: assets.office4,
    alt: "Employee Relax Area",
    size: "col-span-1 row-span-2",
  },
  {
    src: assets.office5,
    alt: "Teams Networking Dinner",
    size: "col-span-2 row-span-1",
  },
];

export const partnerInfo = [
  {
    id: 1,
    img: lawyer1,
    title: "Intellectual property Consultant",
    desc: "Specializing in protecting and enforcing intellectual property rights including patents, trademarks, and copyrights.",
    linkedin: "https://www.linkedin.com",
    email: "lawyer@gmail.com",
  },
  {
    id: 2,
    img: lawyer2,
    title: "Tax Law Consultant",
    desc: "Specializing in Tax law matters.",
    linkedin: "https://www.linkedin.com",
    email: "lawyer@gmail.com",
  },
  {
    id: 3,
    img: lawyer3,
    title: "IT Law Consultant",
    desc: "Specializing in IT law matters including data privacy, cybersecurity, and digital contracts.",
    linkedin: "https://www.linkedin.com",
    email: "lawyer@gmail.com",
  },
];

export const practiceAreasCard = [
  { title: "Banking & Finance Law", image: banking, path: "banking" },
  { title: "Corporate & Commercial", image: corporate, path: "corporate" },
  { title: "Dispute Resolution", image: dispute, path: "dispute" },
  { title: "Intellectual Property", image: ip, path: "ip" },
  { title: "Privacy and Data Protection", image: privacy, path: "privacy" },
  { title: "Real Estate", image: real_estate, path: "real-estate" },
  { title: "Tax and Transfer Pricing", image: tax, path: "tax" },
  {
    title: "Technology, Media & Telecommunications",
    image: tech,
    path: "tech",
  },
  { title: "Energy Law", image: energy, path: "energy" },
];

export const insightsData = [
  {
    title: "Commercial",
    category: "Commercial",
    description:
      "Explore how digital transformation is reshaping the banking industry and what it means for consumers and financial institutions.",
    image: banking,
    Date: "June 20, 2024",
  },
  {
    title: "privacy",
    description:
      "Analysis of Policy Developments on Cross-Border Data Transfers (CBDT) and Digital Trade in Nigeria.",
    image: privacy,
    Date: "June 20, 2024",
  },
  {
    title: "Arbitration",
    category: "Dispute Resolution",
    description:
      "Enforcement of Arbitral Awards Under the Provisions of the Arbitration and Mediation Act, 2023 and Other Extant Statutes in Nigeria",
    image: dispute,
    Date: "June 20, 2024",
  },
  {
    title: "Insolvency",
    category: "Dispute Resolution",
    description:
      "Reviving Businesses: A Critical Analysis of Insolvency Provisions Under Cama 1990 and Cama 2020.",
    image: real_estate,
    Date: "June 20, 2024",
  },
  {
    title: "Criminal Law",
    description:
      "The Law & Politics of Presidential Pardon: A Jurisprudential Inquiry Into Mercy, Finality, and Power.",
    image: energy,
    Date: "July 20, 2024",
  },
  {
    title: "Evidence Law",
    description:
      "Inadmissibility of Photocopy of Certified True Copy of Public Document In Evidence",
    image: media,
    Date: "July 20, 2024",
  },
  {
    title: "Family Law",
    description:
      "Navigating the Complexities of Child Custody in Nigeria: Legal Frameworks, Cultural Considerations, and Best Practices for Protecting Children's Rights.",
    image: media,
    Date: "July 20, 2024",
  },
  {
    title: "Corporate Law",
    description:
      "Understanding Corporate Governance and Legal Compliance in Nigeria.",
    image: corporate,
    Date: "July 20, 2024",
  },
  {
    title: "Data Privacy",
    description:
      "Data Privacy in Nigeria: Navigating the Legal Landscape and Protecting Personal Information in the Digital Age.",
    image: privacy,
    Date: "July 20, 2024",
  },
  {
    title: "Real Estate Law",
    description:
      "Real Estate Law in Nigeria: Navigating Legal Challenges and Ensuring Secure Property Transactions.",
    image: real_estate,
    Date: "July 20, 2024",
  },
  {
    title: "Mergers and Acquisitions",
    description:
      "Mergers and Acquisitions in Nigeria: Navigating Legal Complexities and Market Dynamics for Successful Transactions.",
    image: corporate,
    Date: "July 20, 2024",
  },
  {
    title: "Technology",
    description:
      "Underlying Risks of Using AI-Generated Evidence in Nigeria’s Justice System: A Critical Examination of Admissibility, Reliability, and Ethical Implications.",
    image: tech,
    Date: "July 20, 2024",
  },
  {
    title: "Intellectual Property",
    description:
      "Intellectual Property Rights in the Digital Age: Challenges and Opportunities for Nigerian Creators and Innovators.",
    image: ip2,
    Date: "July 20, 2024",
  },
];

export const homeInsightsData = [
  {
    title: "Data Privacy",
    description:
      "Data Privacy in Nigeria: Navigating the Legal Landscape and Protecting Personal Information in the Digital Age.",
    image: privacy,
    Date: "July 20, 2024",
  },

  {
    title: "Technology",
    description:
      "Underlying Risks of Using AI-Generated Evidence in Nigeria’s Justice System: A Critical Examination of Admissibility, Reliability, and Ethical Implications.",
    image: tech,
    Date: "July 20, 2024",
  },
  {
    title: "Intellectual Property",
    description:
      "Intellectual Property Rights in the Digital Age: Challenges and Opportunities for Nigerian Creators and Innovators.",
    image: ip2,
    Date: "July 20, 2024",
  },
];

export const practiceAreas = [
  {
    title: "Banking & Finance Law",
    subtitle:
      "Specialized legal advocacy tailored for the evolving commercial landscape.",
    path: "banking",
  },
  {
    title: "Corporate & Commercial",
    subtitle:
      "Advising businesses on formation, governance, contracts, and regulatory compliance.",
    path: "corporate",
  },
  {
    title: "Dispute Resolution",
    subtitle:
      "Representing clients in civil disputes with a focus on efficient and strategic outcomes.",
    path: "dispute",
  },
  {
    title: "Intellectual Property",
    subtitle:
      "Comprehensive legal services dedicated to the protection and enforcement of your creative and industrial innovations.",
    path: "ip",
  },
  {
    title: "Privacy and Data Protection",
    subtitle:
      "Comprehensive legal solutions for safeguarding data assets and ensuring strict adherence to global privacy obligations.",
    path: "privacy",
  },
  {
    title: "Real Estate",
    subtitle:
      "Handling land transactions, title verification, and resolution of property disputes.",
    path: "real-estate",
  },
  {
    title: "Tax and Transfer Pricing",
    subtitle:
      "Sophisticated legal counsel ensuring total compliance while optimizing financial outcomes through strategic planning.",
    path: "tax",
  },
  {
    title: "Technology, Media & Telecommunications",
    subtitle:
      "Full-service legal expertise tailored to navigate complex regulatory and commercial landscapes.",
    path: "tech",
  },
  {
    title: "Energy Law",
    subtitle:
      "Full-service legal expertise tailored to navigate complex regulatory and commercial landscapes.",
    path: "energy",
  },
];
