import {
  ArrowLeft,
  ArrowLeftRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  Gift,
  HelpCircle,
  History,
  List,
  MessageSquare,
  Phone,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <>
  icon: any;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}) => {
  const [_hovered, setHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const [_tooltipStyle, setTooltipStyle] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (collapsed && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setTooltipStyle({
        top: rect.top + rect.height / 2,
        left: rect.right + 8,
      });
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setTooltipStyle(null);
  };

  // Only render one version depending on collapsed
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center px-2.5 py-2 rounded-lg transition-all duration-150 group justify-center",
              active
                ? "bg-brand/10 text-brand"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="w-4.5 h-4.5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <div ref={itemRef} className="relative">
      <Link
        to={href}
        className={cn(
          "flex items-center px-3 py-2 rounded-lg transition-all duration-150 group gap-2.5",
          active
            ? "bg-brand/10 text-brand font-medium"
            : "text-secondary-foreground hover:bg-secondary hover:text-foreground",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="w-4.5 h-4.5 shrink-0" />
        <span className="text-sm font-sans">{label}</span>
      </Link>
    </div>
  );
};

const SidebarSection = ({
  title,
  children,
  collapsed,
}: {
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
}) => (
  <div className="space-y-0.5 mb-5">
    {!collapsed && (
      <h3 className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 font-sans">
        {title}
      </h3>
    )}
    <div className="space-y-0.5">{children}</div>
  </div>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isSessionPending && !session) {
      navigate("/auth/login", { replace: true });
    }
  }, [isSessionPending, navigate, session]);

  if (isSessionPending) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6">
        <p className="text-sm text-muted-foreground font-sans">
          Oturum kontrol ediliyor...
        </p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userDisplayName =
    session.user.name || session.user.email?.split("@")[0] || "User";
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — MiniMax: white bg, subtle right border */}
      <aside
        className={cn(
          "border-r border-border bg-background flex flex-col z-20 transition-all duration-300",
          collapsed ? "w-16" : "w-60",
        )}
        onMouseEnter={() => {
          // Optionally, you can auto-expand on hover
        }}
        onMouseLeave={() => {
          // Optionally, you can auto-collapse on mouse leave
        }}
      >
        {/* Collapse/Expand Button */}
        <div
          className={cn(
            "flex items-center justify-between px-2 pt-2",
            collapsed ? "justify-center" : "",
          )}
        >
          {!collapsed && (
            <div className="p-4 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-brand">
                <Bot className="text-white w-4 h-4" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground font-display">
                Calling AI
              </span>
            </div>
          )}
          <button
            type="button"
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary transition-colors border border-border text-muted-foreground",
            )}
            style={{ zIndex: 30 }}
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ArrowLeftRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="px-3 mb-3">
            <button
              type="button"
              className="w-full flex items-center justify-between h-10 px-3 rounded-lg bg-secondary hover:bg-muted transition-colors border-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-brand/15 text-brand flex items-center justify-center text-[9px] font-bold">
                  {userInitial}
                </div>
                <span className="truncate text-xs font-medium text-foreground">
                  {userDisplayName}
                </span>
              </div>
              <ChevronsUpDown className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        )}

        <nav
          className={cn(
            "flex-1 py-2 overflow-y-auto scrollbar-thin",
            collapsed ? "px-1" : "px-3",
          )}
        >
          <SidebarSection title="İnşa Et" collapsed={collapsed}>
            <SidebarItem
              icon={Bot}
              label="Temsilciler"
              href="/dashboard"
              active={location.pathname === "/dashboard"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={BookOpen}
              label="Bilgi Bankası"
              href="/dashboard/knowledge-base"
              active={location.pathname === "/dashboard/knowledge-base"}
              collapsed={collapsed}
            />
          </SidebarSection>

          <SidebarSection title="Dağıtım" collapsed={collapsed}>
            <SidebarItem
              icon={Phone}
              label="Telefon Numaraları"
              href="/dashboard/numbers"
              active={location.pathname === "/dashboard/numbers"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={List}
              label="Toplu Çağrı"
              href="/dashboard/bulk-calls"
              active={location.pathname === "/dashboard/bulk-calls"}
              collapsed={collapsed}
            />
          </SidebarSection>

          <SidebarSection title="İzleme" collapsed={collapsed}>
            <SidebarItem
              icon={History}
              label="Çağrı Geçmişi"
              href="/dashboard/call-history"
              active={location.pathname === "/dashboard/call-history"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={MessageSquare}
              label="Sohbet Geçmişi"
              href="/dashboard/chat-history"
              active={location.pathname === "/dashboard/chat-history"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={BarChart3}
              label="Analizler"
              href="/dashboard/analytics"
              active={location.pathname === "/dashboard/analytics"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={ShieldCheck}
              label="AI Kalite Güvencesi"
              href="/dashboard/ai-qa"
              active={location.pathname === "/dashboard/ai-qa"}
              collapsed={collapsed}
            />
          </SidebarSection>

          <SidebarSection title="Sistem" collapsed={collapsed}>
            <SidebarItem
              icon={CreditCard}
              label="Faturalandırma"
              href="/dashboard/billing"
              active={location.pathname === "/dashboard/billing"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={Settings}
              label="Ayarlar"
              href="/dashboard/settings"
              active={location.pathname === "/dashboard/settings"}
              collapsed={collapsed}
            />
          </SidebarSection>
          <SidebarSection title="Agent" collapsed={collapsed}>
            <SidebarItem
              icon={Settings}
              label="Agent Flow"
              href="/dashboard/agent-flow"
              active={location.pathname === "/dashboard/agent-flow"}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={Settings}
              label="Agent"
              href="/dashboard/agent"
              active={location.pathname === "/dashboard/agent"}
              collapsed={collapsed}
            />
          </SidebarSection>
        </nav>

        {!collapsed && (
          <div className="p-3 border-t border-border space-y-1">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-secondary-foreground"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span className="text-xs font-medium">Ücretsiz Deneme</span>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <div className="flex items-center gap-2 overflow-hidden">
                <Avatar className="w-7 h-7 border border-border">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-brand text-white text-[10px] font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="text-[11px] font-medium truncate text-foreground">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="w-3 h-3 text-muted-foreground shrink-0" />
            </div>

            <div className="flex items-center justify-around pt-2 border-t border-muted">
              <button
                type="button"
                className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors py-1.5"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Yardım</span>
              </button>
              <button
                type="button"
                className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors py-1.5"
              >
                <Bell className="w-3 h-3" />
                <span>Güncellemeler</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
