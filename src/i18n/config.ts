export const locales = ['tr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  if (!isLocale(segments[0])) {
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  }

  const nextPath = `/${segments.slice(1).join('/')}`;
  return nextPath === '/' ? '/' : nextPath.replace(/\/$/, '');
}

export function localizePath(pathname: string, locale: Locale): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const strippedPath = stripLocaleFromPathname(normalizedPath);

  return strippedPath === '/'
    ? `/${locale}`
    : `/${locale}${strippedPath === '/' ? '' : strippedPath}`;
}
