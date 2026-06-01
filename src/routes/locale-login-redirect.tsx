import { Navigate } from 'react-router';
import { useLocale } from '@/i18n';

export default function LocaleLoginRedirect() {
  const locale = useLocale();

  return <Navigate to={`/${locale}/dashboard`} replace />;
}
