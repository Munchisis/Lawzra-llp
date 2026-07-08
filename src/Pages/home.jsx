import Hero from "../component/home/hero";
import About from "../component/home/about";
import Practice from "../component/home/practice";
import Testimonial from "../component/home/testimonial";
import Partners from "../component/home/Partners";
import Insight from "../component/home/insight";
import SpeakToALawyer from "../component/home/SpeakToALawyer";
import SEO from "../../SEO";

const Home = () => {
  return (
    <div>
      <SEO
        title="Top Law Firm in Nigeria"
        description="Lawzra offers expert legal services across Nigeria in corporate law, banking, tax, real estate, IP, energy, tech and dispute resolution."
        canonical="/"
      />
      <Hero />
      <About />
      <Practice />
      <Partners />
      <Insight />
      <Testimonial />
      <SpeakToALawyer />
    </div>
  );
};

export default Home;
