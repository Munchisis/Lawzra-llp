import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, canonical, type = "website" }) => (
  <Helmet>
    <title>{title} | Lawzra</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`https://lawzra.netlify.app${canonical}`} />
    <meta property="og:title" content={`${title} | Lawzra`} />
    <meta property="og:description" content={description} />
    <meta
      property="og:url"
      content={`https://lawzra.netlify.app${canonical}`}
    />
    <meta property="og:type" content={type} />
  </Helmet>
);

export default SEO;
