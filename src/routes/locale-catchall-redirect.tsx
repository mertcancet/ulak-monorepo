import { Navigate } from 'react-router';
import { useLocale } from '@/i18n';

export default function LocaleCatchallRedirect() {
  const locale = useLocale();

  return <Navigate to={`/${locale}`} replace />;
}
