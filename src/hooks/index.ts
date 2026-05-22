import { useEffect, useRef, useState } from "react";
import type { Route } from "../data";

export function normalizeRoute(p: string): Route {
  const c = p.replace(/\/$/, "") || "/";
  const rs: Route[] = ["/", "/about", "/2w-fleet-operator", "/4w-fleet-operator", "/workshop", "/platform", "/investor-partners", "/visi-2030", "/contact"];
  return rs.includes(c as Route) ? (c as Route) : "/";
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => normalizeRoute(window.location.pathname));
  useEffect(() => {
    const fn = () => setRoute(normalizeRoute(window.location.pathname));
    window.addEventListener("popstate", fn);
    return () => window.removeEventListener("popstate", fn);
  }, []);
  return route;
}

export function useScrolled(threshold = 30): boolean {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return s;
}

export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function go(href: Route) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
