import { useRoute } from "./hooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage     from "./pages/home";
import AboutPage    from "./pages/about";
import ServicesPage from "./pages/services";
import FleetPage    from "./pages/fleet";
import WorkshopPage from "./pages/workshop";
import InvestorPage from "./pages/investor";
import ContactPage  from "./pages/contact";
import type { Route } from "./data";

function renderRoute(route: Route) {
  switch (route) {
    case "/about":    return <AboutPage />;
    case "/services": return <ServicesPage />;
    case "/fleet":    return <FleetPage />;
    case "/workshop": return <WorkshopPage />;
    case "/investor": return <InvestorPage />;
    case "/contact":  return <ContactPage />;
    default:          return <HomePage />;
  }
}

export default function App() {
  const route = useRoute();
  return (
    <>
      <Header route={route} />
      <main className="main-content">{renderRoute(route)}</main>
      <Footer route={route} />
    </>
  );
}
