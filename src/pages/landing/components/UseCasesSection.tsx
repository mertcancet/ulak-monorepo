import { useCases } from "@/features/useCases/data";
import { useTranslations } from "@/i18n";
import {
  BookOpen,
  Building2,
  DollarSign,
  Heart,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

const iconMap = {
  Heart,
  Building2,
  ShoppingCart,
  UtensilsCrossed,
  BookOpen,
  DollarSign,
};

export const UseCasesSection = () => {
  const t = useTranslations();

  return (
    <section id="use-cases" className="bg-background px-6 py-32 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            {t("landing.useCases.sectionTitle")}
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            {t("landing.useCases.sectionDescription")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(useCases).map((useCase) => (
            <div
              key={useCase.id}
              className="glass group rounded-xl border border-white/5 p-8 transition-all hover:border-primary/30 hover:shadow-[0_0_32px_hsl(var(--primary)/0.2)]"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  {(() => {
                    const Icon = iconMap[useCase.icon as keyof typeof iconMap];
                    return Icon ? (
                      <Icon className="h-7 w-7 text-primary" />
                    ) : null;
                  })()}
                </div>
                <h3 className="text-xl font-bold">
                  {t(`landing.useCases.items.${useCase.id}.title`)}
                </h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase mb-1">
                    {t("landing.useCases.labels.problem")}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {t(`landing.useCases.items.${useCase.id}.problem`)}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-primary uppercase mb-1">
                    {t("landing.useCases.labels.solution")}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {t(`landing.useCases.items.${useCase.id}.solution`)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary uppercase">
                  {t("landing.useCases.labels.keyFeatures")}
                </p>
                <ul className="space-y-1">
                  {[0, 1].map(index => (
                    <li key={`${useCase.id}-${index}`} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      {t(`landing.useCases.items.${useCase.id}.features.${index}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
