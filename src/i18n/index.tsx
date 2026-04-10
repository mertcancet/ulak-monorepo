/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { Navigate, Outlet, ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import { defaultLocale, isLocale, localizePath, type Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';

interface MessageTree {
  [key: string]: string | MessageTree;
}

const LocaleContext = createContext<Locale>(defaultLocale);

function getMessageValue(locale: Locale, key: string): string {
  const segments = key.split('.');
  let current: string | MessageTree = messages[locale] as MessageTree;

  for (const segment of segments) {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      return key;
    }

    current = current[segment] as string | MessageTree;
  }

  return typeof current === 'string' ? current : key;
}

export function LocaleLayout() {
  const { locale } = useParams();

  if (!isLocale(locale)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  return (
    <LocaleContext.Provider value={locale}>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useTranslations() {
  const locale = useLocale();

  return (key: string) => getMessageValue(locale, key);
}

export function useLocalizedPath(pathname: string) {
  const locale = useLocale();
  return localizePath(pathname, locale);
}

export function useCurrentLocalePath() {
  const location = useLocation();
  return localizePath(location.pathname, useLocale());
}
