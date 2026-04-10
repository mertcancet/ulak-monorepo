import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useTranslations } from '@/i18n';
import { stripLocaleFromPathname } from '@/i18n/config';
import { Outlet, useLocation } from 'react-router-dom';

export function AppLayout() {
  const location = useLocation();
  const t = useTranslations();
  const pathname = stripLocaleFromPathname(location.pathname);
  const dashboardPath = pathname.startsWith('/dashboard')
    ? pathname.replace('/dashboard', '') || '/'
    : '/';

  const pageMeta: Record<string, { title: string; description: string }> = {
    '/': {
      title: t('pageMeta.dashboardTitle'),
      description: t('pageMeta.dashboardDescription'),
    },
    '/agents': {
      title: t('pageMeta.agentsTitle'),
      description: t('pageMeta.agentsDescription'),
    },
    '/calls': {
      title: t('pageMeta.callsTitle'),
      description: t('pageMeta.callsDescription'),
    },
    '/analytics': {
      title: t('pageMeta.analyticsTitle'),
      description: t('pageMeta.analyticsDescription'),
    },
    '/settings': {
      title: t('pageMeta.settingsTitle'),
      description: t('pageMeta.settingsDescription'),
    },
  };

  const meta = pageMeta[dashboardPath] ?? {
    title: t('pageMeta.fallbackTitle'),
    description: '',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={meta.title} description={meta.description} />
        <main className="scrollbar-thin flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
