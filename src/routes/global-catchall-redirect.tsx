import { Navigate } from 'react-router';
import { defaultLocale } from '@/i18n/config';

export default function GlobalCatchallRedirect() {
  return <Navigate to={`/${defaultLocale}`} replace />;
}
