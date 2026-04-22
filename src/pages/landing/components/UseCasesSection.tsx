import { useCases } from "@/features/useCases/data";
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

  return (
    <section id="use-cases" className="bg-background px-6 py-32 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            Aynı platform, farklı operasyon senaryoları
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            CleonAI platformu, çeşitli sektörlerde akıllı çağrı otomasyonu ve AI aracılı iş akışlarını destekler.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(useCases).map((useCase) => (
            <div
              key={useCase.id}
              className="glass neon-glow-mint group rounded-xl border border-white/5 p-8 transition-all hover:border-accent-mint/30"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-mint/10 transition-colors group-hover:bg-accent-mint/20">
                  {(() => {
                    const Icon = iconMap[useCase.icon as keyof typeof iconMap];
                    return Icon ? (
                      <Icon className="h-7 w-7 text-accent-mint" />
                    ) : null;
                  })()}
                </div>
                <h3 className="text-xl font-bold">{useCase.title}</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-accent-mint uppercase mb-1">
                    Problem
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {useCase.problem}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-accent-mint uppercase mb-1">
                    Çözüm
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {useCase.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-accent-mint uppercase">
                  Temel Özellikler
                </p>
                <ul className="space-y-1">
                  {useCase.features.slice(0, 2).map((feature, index) => (
                    <li key={index + feature} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-accent-mint" />
                      {feature}
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
