import { useTranslations } from "@/i18n";
import { CheckCircle2, Settings2, TrendingUp, Zap } from "lucide-react";

export const OurApproach = () => {
  const t = useTranslations();

  const steps = [
    {
      number: "01",
      key: "discover",
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    },
    {
      number: "02",
      key: "integrate",
      icon: <Settings2 className="h-8 w-8 text-primary" />,
    },
    {
      number: "03",
      key: "personalize",
      icon: <Zap className="h-8 w-8 text-primary" />,
    },
    {
      number: "04",
      key: "optimize",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
    },
  ] as const;

  return (
    <section id="our-approach" className="relative bg-background px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-20">
          <div className="mb-6">
            <p className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {t("landing.ourApproach.badge")}
            </p>
          </div>
          <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("landing.ourApproach.titleLine1")}
            <br />
            {t("landing.ourApproach.titleLine2")}
            <br />
            <span className="text-primary">{t("landing.ourApproach.titleHighlight")}</span>
          </h2>
          <p className="max-w-3xl text-lg text-slate-400">
            {t("landing.ourApproach.description")}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute -bottom-6 left-12 h-6 w-0.5 bg-gradient-to-b from-primary/40 to-transparent"></div>
              )}

              <div className="glass group rounded-xl border border-white/10 p-8 transition-all hover:border-primary/30 hover:bg-white/5 hover:shadow-[0_0_32px_hsl(var(--primary)/0.2)]">
                <div className="flex gap-6">
                  {/* Step Number & Icon */}
                  <div className="relative flex flex-col items-center pt-1">
                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-primary/5 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                      <div className="text-center">
                        <p className="text-xs text-primary/60">{t("landing.ourApproach.stepLabel")}</p>
                        <p className="text-2xl font-bold text-primary">{step.number}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {t(`landing.ourApproach.steps.${step.key}.title`)}
                        </h3>
                        <p className="mt-2 leading-relaxed text-slate-400">
                          {t(`landing.ourApproach.steps.${step.key}.description`)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1">
                      <span className="text-xs font-semibold text-primary">
                        {t(`landing.ourApproach.steps.${step.key}.status`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            {t("landing.ourApproach.ctaTitle")}
          </h3>
          <p className="mb-6 text-slate-400">
            {t("landing.ourApproach.ctaDescription")}
          </p>
          <button
            type="button"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-black transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            {t("landing.ourApproach.ctaButton")}
          </button>
        </div>
      </div>
    </section>
  );
};
