import Hero from "../component/home/Hero";
import About from "../component/home/about";
import Practice from "../component/home/Practice";
import Testimonial from "../component/home/Testimonial";
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
