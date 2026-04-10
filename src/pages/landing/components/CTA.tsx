import { Button } from '@/components/ui/button';
import { useLocalizedPath, useTranslations } from '@/i18n';
import { Link } from 'react-router-dom';

export const CTA = () => {
  const t = useTranslations();
  const demoPath = useLocalizedPath('/demo');

  return (
    <section id="pricing" className="bg-background-dark px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-12 text-center md:p-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent-purple to-background-dark opacity-90"></div>
        <div className="relative z-10 text-white">
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            {t('landing.cta.titleLine1')} <br /> {t('landing.cta.titleLine2')}
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-xl font-light text-white/80">
            {t('landing.cta.description')}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="rounded-xl bg-white px-10 py-7 font-bold text-background-dark transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <Link to={demoPath}>{t('landing.cta.primaryButton')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/20 bg-white/10 px-10 py-7 font-bold text-white transition-all hover:bg-white/20"
            >
              <Link to={demoPath}>{t('landing.cta.secondaryButton')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
