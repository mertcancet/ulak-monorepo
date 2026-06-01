import { Link } from 'react-router';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useLocalizedPath, useTranslations } from '@/i18n';
import { usePathname } from '@/i18n/navigation';

export const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const homePath = useLocalizedPath('/');
  const demoPath = useLocalizedPath('/demo');

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sectionLink = (sectionId: string) =>
    pathname === '/' ? `#${sectionId}` : `${homePath}#${sectionId}`;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 text-white">
        <div className="flex items-center gap-2">
          <Link
            className="font-display text-xl font-bold tracking-tight transition-colors"
            onClick={handleBrandClick}
            to={homePath}
          >
            Cleon<span className="text-primary">AI</span>
          </Link>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex">
          <a
            className="transition-colors hover:cursor-pointer hover:text-primary"
            href={sectionLink('features')}
          >
            {t('navbar.features')}
          </a>
          <a
            className="transition-colors hover:cursor-pointer hover:text-primary"
            href={sectionLink('solutions')}
          >
            {t('navbar.solutions')}
          </a>
          <a
            className="transition-colors hover:cursor-pointer hover:text-primary"
            href={sectionLink('analytics')}
          >
            {t('navbar.analytics')}
          </a>
          <a
            className="transition-colors hover:cursor-pointer hover:text-primary"
            href={sectionLink('pricing')}
          >
            {t('navbar.pricing')}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <Button
            asChild
            className="rounded-lg bg-primary text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            <Link to={demoPath}>{t('navbar.launchApp')}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
