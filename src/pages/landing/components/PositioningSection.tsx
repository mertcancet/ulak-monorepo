import { useTranslations } from "@/i18n";
import { CheckCircle2, ShieldCheck, TriangleAlert } from "lucide-react";

export function PositioningSection() {
  const t = useTranslations();

  const painPoints = [
    t("landing.positioning.legacy.pains.0"),
    t("landing.positioning.legacy.pains.1"),
    t("landing.positioning.legacy.pains.2"),
  ];

  const strengths = [
    t("landing.positioning.cleon.strengths.0"),
    t("landing.positioning.cleon.strengths.1"),
    t("landing.positioning.cleon.strengths.2"),
  ];

  return (
    <section className="bg-background px-6 py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("landing.positioning.badge")}
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            {t("landing.positioning.title")}
          </h2>
          <p className="text-base leading-relaxed text-slate-400 md:text-lg">
            {t("landing.positioning.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="glass rounded-2xl border border-rose-500/20 p-7">
            <div className="mb-5 flex items-center gap-3">
              <TriangleAlert className="text-rose-400" size={20} />
              <h3 className="text-lg font-bold md:text-xl">
                {t("landing.positioning.legacy.title")}
              </h3>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-400 md:text-base">
              {painPoints.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="glass rounded-2xl border border-emerald-500/20 p-7">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" size={20} />
              <h3 className="text-lg font-bold md:text-xl">
                {t("landing.positioning.cleon.title")}
              </h3>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-300 md:text-base">
              {strengths.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-400" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
