import { useLocation, useNavigate } from 'react-router-dom';
import { localizePath } from '@/i18n/config';
import { useLocale } from '@/i18n';
import type { Locale } from '@/i18n/config';

function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  return `/${segments.slice(1).join('/')}`;
}

export function usePathname() {
  const location = useLocation();
  return stripLocale(location.pathname);
}

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const locale = useLocale();

  return {
    push(pathname: string, options?: { locale?: Locale }) {
      const nextLocale = options?.locale ?? locale;
      navigate(`${localizePath(pathname, nextLocale)}${location.search}${location.hash}`);
    },
    replace(pathname: string, options?: { locale?: Locale }) {
      const nextLocale = options?.locale ?? locale;
      navigate(`${localizePath(pathname, nextLocale)}${location.search}${location.hash}`, {
        replace: true,
      });
    },
  };
}
