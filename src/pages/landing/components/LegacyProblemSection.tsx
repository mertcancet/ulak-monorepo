import { useTranslations } from "@/i18n";
import { AlertCircle, Clock, MessageSquareOff } from "lucide-react";

function BotFace() {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-950 shadow-xl">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
      >
        <rect x="8" y="10" width="24" height="20" rx="2" fill="#1e293b" />
        <rect x="12" y="14" width="5" height="5" rx="1" fill="#ef4444" />
        <rect x="23" y="14" width="5" height="5" rx="1" fill="#ef4444" />
        <rect x="13" y="23" width="14" height="3" rx="1" fill="#ef4444" />
        <rect x="16" y="6" width="8" height="4" rx="1" fill="#475569" />
        <rect x="19" y="4" width="2" height="2" rx="0.5" fill="#94a3b8" />
      </svg>
    </div>
  );
}

function QuoteBubble({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 shadow-lg">
      <span className="text-xs font-medium text-slate-300">
        &ldquo;{text}&rdquo;
      </span>
    </div>
  );
}

const cardIcons = [
  <MessageSquareOff key="emotions" className="text-rose-400" size={22} />,
  <Clock key="latency" className="text-rose-400" size={22} />,
  <AlertCircle key="conversation" className="text-rose-400" size={22} />,
];

export function LegacyProblemSection() {
  const t = useTranslations();

  const quoteTexts = [
    t("landing.legacyProblem.quotes.0"),
    t("landing.legacyProblem.quotes.1"),
    t("landing.legacyProblem.quotes.2"),
    t("landing.legacyProblem.quotes.3"),
  ];

  const cardTitles = [
    t("landing.legacyProblem.cards.emotions.title"),
    t("landing.legacyProblem.cards.latency.title"),
    t("landing.legacyProblem.cards.conversation.title"),
  ];

  return (
    <section className="bg-background px-6 py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {t("landing.legacyProblem.badge")}
        </p>

        {/* Headline */}
        <h2 className="mx-auto mb-16 max-w-2xl font-display text-3xl font-extrabold leading-tight text-slate-100 md:text-5xl">
          {t("landing.legacyProblem.title")}
        </h2>

        {/* Diagram — grid layout so lines align reliably */}
        <div className="mb-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left bubbles */}
          <div className="flex flex-col items-end gap-3">
            <QuoteBubble text={quoteTexts[0]} />
            <QuoteBubble text={quoteTexts[1]} />
          </div>

          {/* Center connector + bot */}
          <div className="flex items-center gap-0">
            {/* Left connectors */}
            <div className="flex flex-col items-end gap-8">
              <div className="h-px w-8 bg-slate-600" />
              <div className="h-px w-8 bg-slate-600" />
            </div>

            <BotFace />

            {/* Right connectors */}
            <div className="flex flex-col items-start gap-8">
              <div className="h-px w-8 bg-slate-600" />
              <div className="h-px w-8 bg-slate-600" />
            </div>
          </div>

          {/* Right bubbles */}
          <div className="flex flex-col items-start gap-3">
            <QuoteBubble text={quoteTexts[2]} />
            <QuoteBubble text={quoteTexts[3]} />
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cardTitles.map((title, i) => (
            <article
              key={title}
              className="glass flex flex-col items-start gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                {cardIcons[i]}
              </div>
              <p className="text-sm font-medium leading-snug text-slate-300">
                {title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
