import { useRoute } from "./hooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage     from "./pages/home";
import AboutPage    from "./pages/about";
import TwoWFleetOperatorPage from "./pages/services";
import FleetPage    from "./pages/fleet";
import WorkshopPage from "./pages/workshop";
import PlatformPage from "./pages/platform";
import InvestorPage from "./pages/investor";
import Vision2030Page from "./pages/visi-2030";
import ContactPage  from "./pages/contact";
import AdminPage from "./pages/admin";
import type { Route } from "./data";

function renderRoute(route: Route) {
  switch (route) {
    case "/about":    return <AboutPage />;
    case "/2w-fleet-operator": return <TwoWFleetOperatorPage />;
    case "/4w-fleet-operator": return <FleetPage />;
    case "/workshop": return <WorkshopPage />;
    case "/platform": return <PlatformPage />;
    case "/investor-partners": return <InvestorPage />;
    case "/visi-2030": return <Vision2030Page />;
    case "/contact":  return <ContactPage />;
    case "/admin/dashboard": return <AdminPage />;
    default:          return <HomePage />;
  }
}

export default function App() {
  const route = useRoute();
  if (route === "/admin/dashboard") return <AdminPage />;

  return (
    <>
      <Header route={route} />
      <main className="main-content">{renderRoute(route)}</main>
      <Footer />
    </>
  );
}
