import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SmoothScroll from "./component/SmoothScroll.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </HelmetProvider>
  </BrowserRouter>,
);
