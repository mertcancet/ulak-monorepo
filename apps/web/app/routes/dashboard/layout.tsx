import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Bot,
  BookOpen,
  Phone,
  List,
  History,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  CreditCard,
  Settings,
  ChevronDown,
  Gift,
  HelpCircle,
  Bell,
  Search,
  LayoutDashboard,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
}) => (
  <Link
    to={href}
    className={cn(
      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group",
      active
        ? "bg-primary/10 text-primary font-semibold shadow-sm"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
    )}
  >
    <Icon
      className={cn(
        "w-4 h-4",
        active ? "text-primary" : "group-hover:text-foreground",
      )}
    />
    <span className="text-sm">{label}</span>
  </Link>
);

const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1 mb-6">
    <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
      {title}
    </h3>
    <div className="space-y-0.5">{children}</div>
  </div>
);

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col z-20">
        <div className="p-6 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Calling AI
          </span>
        </div>

        <div className="px-4 mb-4">
          <Button
            variant="outline"
            className="w-full justify-between h-10 px-3 bg-secondary/50 border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/20 text-primary rounded flex items-center justify-center text-[10px] font-bold">
                MB
              </div>
              <span className="truncate text-xs font-medium">
                Mert Bey's Workspace
              </span>
            </div>
            <ChevronsUpDown className="w-3 h-3 text-muted-foreground" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-2 overflow-y-auto scrollbar-thin">
          <SidebarSection title="İnşa Et">
            <SidebarItem
              icon={Bot}
              label="Temsilciler"
              href="/dashboard"
              active={location.pathname === "/dashboard"}
            />
            <SidebarItem
              icon={BookOpen}
              label="Bilgi Bankası"
              href="/dashboard/knowledge-base"
              active={location.pathname === "/dashboard/knowledge-base"}
            />
          </SidebarSection>

          <SidebarSection title="Dağıtım">
            <SidebarItem
              icon={Phone}
              label="Telefon Numaraları"
              href="/dashboard/numbers"
              active={location.pathname === "/dashboard/numbers"}
            />
            <SidebarItem
              icon={List}
              label="Toplu Çağrı"
              href="/dashboard/bulk-calls"
              active={location.pathname === "/dashboard/bulk-calls"}
            />
          </SidebarSection>

          <SidebarSection title="İzleme">
            <SidebarItem
              icon={History}
              label="Çağrı Geçmişi"
              href="/dashboard/call-history"
              active={location.pathname === "/dashboard/call-history"}
            />
            <SidebarItem
              icon={MessageSquare}
              label="Sohbet Geçmişi"
              href="/dashboard/chat-history"
              active={location.pathname === "/dashboard/chat-history"}
            />
            <SidebarItem
              icon={BarChart3}
              label="Analizler"
              href="/dashboard/analytics"
              active={location.pathname === "/dashboard/analytics"}
            />
            <SidebarItem
              icon={ShieldCheck}
              label="AI Kalite Güvencesi"
              href="/dashboard/ai-qa"
              active={location.pathname === "/dashboard/ai-qa"}
            />
          </SidebarSection>

          <SidebarSection title="Sistem">
            <SidebarItem
              icon={CreditCard}
              label="Faturalandırma"
              href="/dashboard/billing"
              active={location.pathname === "/dashboard/billing"}
            />
            <SidebarItem
              icon={Settings}
              label="Ayarlar"
              href="/dashboard/settings"
              active={location.pathname === "/dashboard/settings"}
            />
          </SidebarSection>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-between px-3 text-muted-foreground hover:text-foreground"
          >
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span className="text-xs">Ücretsiz Deneme</span>
            </div>
            <ChevronDown className="w-3 h-3" />
          </Button>

          <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-2 overflow-hidden">
              <Avatar className="w-7 h-7 border border-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-orange-500 text-white text-[10px] font-bold">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-[11px] font-medium truncate">
                  mertcancet95@gmail.com
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-3 h-3 text-muted-foreground shrink-0" />
          </div>

          <div className="flex items-center justify-around py-2 border-t border-border pt-4">
            <button className="text-[10px] text-muted-foreground hover:text-foreground flex items-center space-x-1 transition-colors">
              <HelpCircle className="w-3 h-3" />
              <span>Yardım</span>
            </button>
            <button className="text-[10px] text-muted-foreground hover:text-foreground flex items-center space-x-1 transition-colors">
              <Bell className="w-3 h-3" />
              <span>Güncellemeler</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
