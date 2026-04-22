import { useTranslations } from '@/i18n';

export const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="border-t border-white/5 bg-background-dark px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6">
        <div className="col-span-2">
          <div className="mb-6 flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight">
              Cleon<span className="text-primary">AI</span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-500">
            {t('landing.footer.brandDescription')}
          </p>
        </div>
        <div>
          <h5 className="mb-6 text-sm font-bold">{t('landing.footer.sections.product')}</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.aiVoice')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.integrations')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.dashboard')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.security')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 text-sm font-bold">{t('landing.footer.sections.company')}</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.about')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.blog')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.careers')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.contact')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 text-sm font-bold">{t('landing.footer.sections.resources')}</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.documentation')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.apiReference')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.community')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.support')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 text-sm font-bold">{t('landing.footer.sections.legal')}</h5>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.privacy')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.terms')}
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-primary" href="#">
                {t('landing.footer.links.gdpr')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-xs text-slate-500 md:flex-row">
        <p>{t('landing.footer.copyright')}</p>
        <div className="flex gap-6">
          <a className="transition-colors hover:text-white" href="#">
            Twitter
          </a>
          <a className="transition-colors hover:text-white" href="#">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-white" href="#">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
