import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { LangProvider } from "./i18n";
import { SiteMetricsProvider } from "./siteMetrics";
import { VehicleCatalogProvider } from "./vehicleCatalog";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SiteMetricsProvider>
      <VehicleCatalogProvider>
        <LangProvider>
          <App />
        </LangProvider>
      </VehicleCatalogProvider>
    </SiteMetricsProvider>
  </React.StrictMode>,
);
