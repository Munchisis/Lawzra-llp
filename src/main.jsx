import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SmoothScroll from "./component/SmoothScroll.jsx";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://cf6da27be1242abe7c024f4edb1840d0@o4511746293039104.ingest.us.sentry.io/4512022465740800",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/lawzra\.com\/api/],
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </HelmetProvider>
  </BrowserRouter>,
);
