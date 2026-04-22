import { Share2, Wand2, TrendingUp } from 'lucide-react';
import { useTranslations } from '@/i18n';

export const HowItWorks = () => {
  const t = useTranslations();
  const steps = [
    {
      icon: <Share2 className="text-primary" size={32} />,
      borderClass: 'border-primary/40',
      title: t('landing.howItWorks.steps.connect.title'),
      description: t('landing.howItWorks.steps.connect.description'),
    },
    {
      icon: <Wand2 className="text-accent-purple" size={32} />,
      borderClass: 'border-accent-purple/40',
      title: t('landing.howItWorks.steps.automate.title'),
      description: t('landing.howItWorks.steps.automate.description'),
    },
    {
      icon: <TrendingUp className="text-accent-mint" size={32} />,
      borderClass: 'border-accent-mint/40',
      title: t('landing.howItWorks.steps.scale.title'),
      description: t('landing.howItWorks.steps.scale.description'),
    },
  ];

  return (
    <section id="solutions" className="relative overflow-hidden py-32 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold">
            {t('landing.howItWorks.sectionTitle')}
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-primary"></div>
        </div>
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-12 bg-white/5 md:block"></div>

          {steps.map((step) => (
            <div key={step.title} className="relative text-center">
              <div
                className={`glass relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${step.borderClass}`}
              >
                {step.icon}
              </div>
              <h4 className="mb-4 text-xl font-bold">{step.title}</h4>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
