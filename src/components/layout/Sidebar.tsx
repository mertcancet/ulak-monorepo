import {
  BarChart3,
  Bot,
  ChevronRight,
  Headphones,
  LayoutDashboard,
  PhoneCall,
  Settings,
  Zap,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { useLocalizedPath, useTranslations } from '@/i18n';
import { stripLocaleFromPathname } from '@/i18n/config';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();
  const t = useTranslations();
  const dashboardRoot = useLocalizedPath('/dashboard');
  const navItems = [
    {
      title: t('sidebar.overview'),
      href: dashboardRoot,
      icon: LayoutDashboard,
    },
    {
      title: t('sidebar.agents'),
      href: useLocalizedPath('/dashboard/agents'),
      icon: Bot,
    },
    {
      title: t('sidebar.calls'),
      href: useLocalizedPath('/dashboard/calls'),
      icon: PhoneCall,
    },
    {
      title: t('sidebar.analytics'),
      href: useLocalizedPath('/dashboard/analytics'),
      icon: BarChart3,
    },
    {
      title: t('sidebar.settings'),
      href: useLocalizedPath('/dashboard/settings'),
      icon: Settings,
    },
  ];
  const normalizedPathname = stripLocaleFromPathname(location.pathname);
  const activeDashboardPath = normalizedPathname.replace('/dashboard', '') || '/';

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg shadow-lg">
          <Headphones className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-none text-sidebar-foreground">CleonAI</span>
          <span className="mt-0.5 text-[10px] leading-none text-sidebar-foreground/50">
            {t('sidebar.brandSubtitle')}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-2 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            {t('sidebar.mainMenu')}
          </p>
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === dashboardRoot
                ? activeDashboardPath === '/'
                : location.pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground',
                    )}
                  />
                  <span className="flex-1">{item.title}</span>
                  {isActive && <ChevronRight className="h-3 w-3 text-white/70" />}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* AI Status indicator */}
        <div className="mt-6 px-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            {t('sidebar.systemStatus')}
          </p>
          <div className="space-y-2 rounded-lg bg-sidebar-accent p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse-soft rounded-full bg-[hsl(142,71%,45%)]" />
                <span className="text-xs text-sidebar-foreground/70">{t('sidebar.aiEngine')}</span>
              </div>
              <span className="text-xs font-medium text-[hsl(142,71%,55%)]">
                {t('sidebar.online')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-sidebar-foreground/50" />
                <span className="text-xs text-sidebar-foreground/70">
                  {t('sidebar.activeCalls')}
                </span>
              </div>
              <span className="text-xs font-semibold text-sidebar-foreground">24</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent">
          <div className="gradient-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-sidebar-foreground">Admin User</p>
            <p className="truncate text-[10px] text-sidebar-foreground/50">admin@CleonAI.com</p>
          </div>
          <Settings className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40" />
        </div>
      </div>
    </aside>
  );
}
