import { Button } from "@/components/ui/button";
import { useLocalizedPath, useTranslations } from "@/i18n";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export function HeroSection() {
  const t = useTranslations();
  const demoPath = useLocalizedPath("/demo");
  const highlights = [
    t("landing.hero.highlights.0"),
    t("landing.hero.highlights.1"),
    t("landing.hero.highlights.2"),
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-40 text-center md:pt-48">
        <span className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t("landing.hero.badge")}
        </span>
        <h1
          className="bg-clip-text text-[clamp(3.5rem,18vw,230px)] font-normal leading-[1.02] tracking-[-0.024em] text-transparent"
          style={{
            fontFamily:
              "General Sans, Geist Sans, Inter, system-ui, sans-serif",
            backgroundImage:
              "linear-gradient(223deg, #E8E8E9 0%, hsl(234 89% 60%) 104.15%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CleonAI
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-xl">
          {t("landing.hero.description")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild className="h-12 rounded-xl px-8 text-sm font-bold">
            <Link to={demoPath}>{t("landing.hero.primaryButton")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl border-white/20 bg-white/5 px-8 text-sm font-semibold text-white hover:bg-white/10"
          >
            <a href="#features">{t("landing.hero.secondaryButton")}</a>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {highlights.map(item => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
