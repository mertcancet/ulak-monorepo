import { Check, TrendingUp, Smile, LineChart } from 'lucide-react';
import { useTranslations } from '@/i18n';

export const AnalyticsPreview = () => {
  const t = useTranslations();
  const bullets = [
    t('landing.analyticsPreview.bullets.sentimentHeatmaps'),
    t('landing.analyticsPreview.bullets.conversionAlerts'),
    t('landing.analyticsPreview.bullets.coachingMetrics'),
  ];

  return (
    <section id="analytics" className="bg-background-dark px-6 py-32 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
        <div className="lg:w-1/2">
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight">
            {t('landing.analyticsPreview.titlePrefix')}{' '}
            <span className="text-primary">{t('landing.analyticsPreview.titleHighlight')}</span>
            {t('landing.analyticsPreview.titleSuffix') && (
              <> {t('landing.analyticsPreview.titleSuffix')}</>
            )}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-400">
            {t('landing.analyticsPreview.description')}
          </p>
          <div className="space-y-4">
            {bullets.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-mint/20">
                  <Check className="text-accent-mint" size={14} />
                </div>
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="glass relative rounded-xl border-white/10 p-6">
            {/* Dashboard Mockup Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="rounded bg-white/5 px-3 py-1 font-mono text-xs text-slate-500">
                REAL-TIME_ANALYTICS_v4.2
              </div>
            </div>
            {/* Metrics Grid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/5 p-4">
                <p className="mb-1 text-xs text-slate-500">
                  {t('landing.analyticsPreview.metrics.totalCallsToday')}
                </p>
                <p className="text-2xl font-bold">12,842</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-accent-mint">
                  <TrendingUp size={10} /> +14.2%
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="mb-1 text-xs text-slate-500">
                  {t('landing.analyticsPreview.metrics.sentimentScore')}
                </p>
                <p className="text-2xl font-bold">94.8%</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-accent-mint">
                  <Smile size={10} />
                  {t('landing.analyticsPreview.metrics.sentimentStatus')}
                </div>
              </div>
            </div>
            {/* Chart Mockup */}
            <div className="relative flex h-48 items-end justify-around overflow-hidden rounded-lg bg-white/5 p-4">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <LineChart className="text-primary" size={60} />
              </div>
              <div className="h-[30%] w-8 rounded-t bg-primary/40"></div>
              <div className="h-[55%] w-8 rounded-t bg-primary/60"></div>
              <div className="h-[80%] w-8 rounded-t bg-primary/80"></div>
              <div className="h-[95%] w-8 rounded-t bg-primary shadow-[0_-5px_15px_rgba(92,141,255,0.4)]"></div>
              <div className="h-[65%] w-8 rounded-t bg-primary/70"></div>
              <div className="h-[45%] w-8 rounded-t bg-primary/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
