import { Navigate } from 'react-router';
import { defaultLocale } from '@/i18n/config';

export default function RootRedirect() {
  return <Navigate to={`/${defaultLocale}`} replace />;
}
