import { useEffect, useRef, type ReactNode } from "react";
import type { Route } from "../data";
import { go } from "../hooks";

// ─── Fade section wrapper ─────────────────────────────────────────────────────
export function FadeSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <section ref={ref} className={className} id={id}>{children}</section>;
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ label }: { label: string }) {
  return (
    <div className="badge">
      <span className="badge-dot" />
      {label}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

// ─── Page hero ────────────────────────────────────────────────────────────────
export function PageHero({ kicker, title, copy, compact = false }: {
  kicker: string; title: string; copy: string; compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const t = setTimeout(() => {
      if (!el) return;
      el.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(t);
  }, [kicker]);

  return (
    <section ref={ref} className={`page-hero${compact ? " page-hero--compact" : ""}`}>
      <div className="page-hero-inner">
        <Badge label={kicker} />
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

// ─── Inline link ──────────────────────────────────────────────────────────────
export function InternalLink({ href, children, className }: {
  href: Route; children: ReactNode; className?: string;
}) {
  return (
    <a href={href} className={className}
      onClick={(e) => { e.preventDefault(); go(href); }}>
      {children}
    </a>
  );
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────
export function CtaBand({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="cta-band">
      <div className="cta-band-content">
        <SectionLabel>Next Step</SectionLabel>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
      <div className="cta-band-actions">
        <InternalLink href="/contact" className="btn-primary">Hubungi Kami</InternalLink>
        <InternalLink href="/investor" className="btn-outline">Investor Page →</InternalLink>
      </div>
    </div>
  );
}
