import { useTranslations } from "@/i18n";
import { BookText, Bot, ChartColumnIncreasing, Workflow } from "lucide-react";

export const Features = () => {
  const t = useTranslations();
  const features = [
    {
      icon: <Bot className="text-primary" />,
      title: t("landing.features.items.voiceAgent.title"),
      description: t("landing.features.items.voiceAgent.description"),
    },
    {
      icon: <Workflow className="text-primary" />,
      title: t("landing.features.items.transcription.title"),
      description: t("landing.features.items.transcription.description"),
    },
    {
      icon: <BookText className="text-primary" />,
      title: t("landing.features.items.sentiment.title"),
      description: t("landing.features.items.sentiment.description"),
    },
    {
      icon: <ChartColumnIncreasing className="text-primary" />,
      title: t("landing.features.items.routing.title"),
      description: t("landing.features.items.routing.description"),
    },
  ];

  return (
    <section id="features" className="bg-background-dark px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            {t("landing.features.sectionTitle")}
          </h2>
          <p className="max-w-xl text-lg text-slate-400">
            {t("landing.features.sectionDescription")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(feature => (
            <div
              key={feature.title}
              className="glass group rounded-xl border-white/5 p-8 transition-all hover:border-primary/30 hover:shadow-[0_0_32px_hsl(var(--primary)/0.2)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
