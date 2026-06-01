import { createBrowserRouter, Navigate } from 'react-router';
import { LocaleLayout, useLocale } from '@/i18n';
import { defaultLocale } from '@/i18n/config';
import { DemoRequestPage } from '@/pages/demo/DemoRequestPage';
import LandingPage from '@/pages/landing/LandingPage';

function LocaleRedirect({ to }: { to: string }) {
  const locale = useLocale();

  return <Navigate to={`/${locale}${to === '/' ? '' : to}`} replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
  {
    path: '/:locale',
    element: <LocaleLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'demo',
        element: <DemoRequestPage />,
      },
      {
        path: 'login',
        element: <LocaleRedirect to="/dashboard" />,
      },
      {
        path: '*',
        element: <LocaleRedirect to="/" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
]);
