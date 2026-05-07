import { useTranslations } from "@/i18n";
import { BotOff, PhoneOff, TrendingDown, Wallet } from "lucide-react";

const icons = [
  <PhoneOff className="text-rose-400" size={24} />,
  <TrendingDown className="text-rose-400" size={24} />,
  <Wallet className="text-rose-400" size={24} />,
  <BotOff className="text-rose-400" size={24} />,
];

const itemKeys = ["ivr", "scale", "cost", "ai"] as const;

export function PainPointsSection() {
  const t = useTranslations();

  return (
    <section className="bg-background px-6 py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-2xl font-bold leading-tight text-slate-200 md:text-4xl">
            {t("landing.painPoints.sectionTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {itemKeys.map((key, i) => (
            <article
              key={key}
              className="glass flex flex-col gap-4 rounded-2xl border border-rose-500/10 p-6 transition-colors hover:border-rose-500/25"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                {icons[i]}
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-slate-100">
                  {t(`landing.painPoints.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {t(`landing.painPoints.items.${key}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
