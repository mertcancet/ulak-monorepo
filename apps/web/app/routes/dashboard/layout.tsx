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
import { Button } from "~/components/ui/button";
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
              "flex items-center px-3 py-2 rounded-lg transition-all duration-200 group justify-center",
              active
                ? "bg-primary/10 text-primary font-semibold shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5",
                active ? "text-primary" : "group-hover:text-foreground",
              )}
            />
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
          "flex items-center px-3 py-2 rounded-lg transition-all duration-200 group space-x-3",
          active
            ? "border-border border"
            : "text-muted-foreground border border-white hover:bg-secondary hover:text-foreground",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon
          className={cn(
            "w-5 h-5",
            active ? "text-primary" : "group-hover:text-foreground",
          )}
        />
        <span className="text-sm">{label}</span>
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
  <div className="space-y-1 mb-6">
    {!collapsed && (
      <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
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
        <p className="text-sm text-muted-foreground">
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
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-border bg-card flex flex-col z-20 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
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
            <div className="p-4 flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Bot className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                Calling AI
              </span>
            </div>
          )}
          <button
            type="button"
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary transition-colors",
              "border border-border",
            )}
            style={{ zIndex: 30 }}
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {/* Left arrow when expanded, right arrow when collapsed */}
            {collapsed ? (
              <ArrowLeftRight className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {!collapsed && (
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
                  {userDisplayName} Workspace
                </span>
              </div>
              <ChevronsUpDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>
        )}

        <nav
          className={cn(
            "flex-1 py-2 overflow-y-auto scrollbar-thin",
            collapsed ? "px-1" : "px-4",
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
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="text-[11px] font-medium truncate">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="w-3 h-3 text-muted-foreground shrink-0" />
            </div>

            <div className="flex items-center justify-around py-2 border-t border-border pt-4">
              <button
                type="button"
                className="text-[10px] text-muted-foreground hover:text-foreground flex items-center space-x-1 transition-colors"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Yardım</span>
              </button>
              <button
                type="button"
                className="text-[10px] text-muted-foreground hover:text-foreground flex items-center space-x-1 transition-colors"
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
