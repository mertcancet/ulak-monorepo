import { useQuery } from "@tanstack/react-query";
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
  Inbox,
  List,
  Phone,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import { workspacesApi } from "~/lib/workspaces-api";
import { useRoles, useRolesStore } from "~/store/roles-store";
import { useWorkspaceStore } from "~/store/workspace-store";

const SELECTED_WORKSPACE_STORAGE_KEY = "selected-workspace-id";

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
              "group flex items-center justify-center rounded-lg px-2.5 py-2 transition-all duration-150",
              active
                ? "bg-brand/10 text-brand"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="h-4.5 w-4.5" />
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
          "group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-150",
          active
            ? "bg-brand/10 text-brand font-medium"
            : "text-secondary-foreground hover:bg-secondary hover:text-foreground",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="h-4.5 w-4.5 shrink-0" />
        <span className="font-sans text-sm">{label}</span>
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
  <div className="mb-5 space-y-0.5">
    {!collapsed && (
      <h3 className="text-muted-foreground mb-1.5 px-3 font-sans text-[10px] font-semibold tracking-widest uppercase">
        {title}
      </h3>
    )}
    <div className="space-y-0.5">{children}</div>
  </div>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { permissions } = useRoles();

  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [collapsed, setCollapsed] = useState(false);
  const selectedWorkspaceId = useWorkspaceStore(
    state => state.selectedWorkspaceId,
  );
  const setSelectedWorkspaceId = useWorkspaceStore(
    state => state.setSelectedWorkspaceId,
  );
  const hideSidebar = false;
  const { fetchRoles } = useRolesStore();

  const { data: workspaces, isPending: isWorkspacesPending } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.listWorkspaces(),
    enabled: !!session,
  });

  useEffect(() => {
    if (!isSessionPending && !session) {
      navigate("/auth/login", { replace: true });
    } else if (session) {
      // Fetch roles when session is available
      void fetchRoles();
    }
  }, [isSessionPending, navigate, session, fetchRoles]);

  useEffect(() => {
    if (!workspaces?.length) {
      return;
    }

    if (selectedWorkspaceId) {
      const workspaceExists = workspaces.some(
        workspace => workspace.id === selectedWorkspaceId,
      );

      if (!workspaceExists) {
        const fallbackWorkspaceId = workspaces[0].id;
        setSelectedWorkspaceId(fallbackWorkspaceId);
      }

      return;
    }

    const storedWorkspaceId =
      typeof window !== "undefined"
        ? localStorage.getItem(SELECTED_WORKSPACE_STORAGE_KEY)
        : null;
    const matchingWorkspace = storedWorkspaceId
      ? workspaces.find(workspace => workspace.id === storedWorkspaceId)
      : null;

    const nextWorkspaceId = matchingWorkspace?.id ?? workspaces[0].id;
    setSelectedWorkspaceId(nextWorkspaceId);
  }, [selectedWorkspaceId, workspaces, setSelectedWorkspaceId]);

  // localStorage işlemi store'a taşındı, bu effect gereksiz

  if (isSessionPending) {
    return (
      <div className="bg-background grid min-h-screen place-items-center p-6">
        <p className="text-muted-foreground font-sans text-sm">
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
  const currentWorkspaceName = workspaces?.find(
    workspace => workspace.id === selectedWorkspaceId,
  )?.name;
  const workspaceTriggerLabel =
    currentWorkspaceName ?? (isWorkspacesPending ? "" : userDisplayName);

  return (
    <div className="bg-background animate-in fade-in-0 flex h-screen overflow-hidden">
      {!hideSidebar && (
        /* Sidebar — MiniMax: white bg, subtle right border */
        <aside
          className={cn(
            "border-border bg-background animate-in slide-in-from-left-2 z-20 flex flex-col border-r transition-all duration-300",
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
              <div className="flex items-center gap-2.5 p-4">
                <div className="gradient-primary shadow-brand flex h-8 w-8 items-center justify-center rounded-xl">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground font-display text-base font-semibold tracking-tight">
                  Cleon AI
                </span>
              </div>
            )}
            <button
              type="button"
              className={cn(
                "hover:bg-secondary border-border text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
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
            <div className="mb-3 px-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="bg-secondary rounded-xl hover:bg-muted flex h-10 w-full items-center justify-between border-0 px-3 transition-colors"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="bg-brand/15 text-brand flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold">
                        {userInitial}
                      </div>
                      <span className="text-foreground truncate text-xs font-medium">
                        {workspaceTriggerLabel}
                      </span>
                    </div>
                    <ChevronsUpDown className="text-muted-foreground h-3 w-3 shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  {workspaces?.length ? (
                    workspaces.map(workspace => (
                      <DropdownMenuItem
                        key={workspace.id}
                        onClick={() => setSelectedWorkspaceId(workspace.id)}
                        className="rounded"
                      >
                        <span className="truncate text-xs">
                          {workspace.name}
                        </span>
                        {selectedWorkspaceId === workspace.id && (
                          <span className="text-brand ml-auto text-[10px]">
                            Aktif
                          </span>
                        )}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled className="rounded">
                      <span className="text-xs">Workspace bulunamadı</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <nav
            className={cn(
              "scrollbar-thin flex-1 overflow-y-auto py-2",
              collapsed ? "px-1" : "px-3",
            )}
          >
            <SidebarSection title="İnşa Et" collapsed={collapsed}>
              {permissions?.agent?.includes("*") ||
              permissions?.agent?.includes("view") ? (
                <SidebarItem
                  icon={Bot}
                  label="Temsilciler"
                  href="/dashboard"
                  active={location.pathname === "/dashboard"}
                  collapsed={collapsed}
                />
              ) : null}
              {permissions?.tool?.includes("*") ||
              permissions?.tool?.includes("view") ? (
                <SidebarItem
                  icon={Wrench}
                  label="Araçlar"
                  href="/dashboard/tools"
                  active={location.pathname.startsWith("/dashboard/tools")}
                  collapsed={collapsed}
                />
              ) : null}
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
                active={location.pathname.startsWith("/dashboard/call-history")}
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
                icon={Users}
                label="Üyeler"
                href="/dashboard/members"
                active={location.pathname === "/dashboard/members"}
                collapsed={collapsed}
              />
              <SidebarItem
                icon={Inbox}
                label="Davetler"
                href="/dashboard/invitations"
                active={location.pathname === "/dashboard/invitations"}
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
          </nav>

          {!collapsed && (
            <div className="border-border space-y-1 border-t p-3">
              <button
                type="button"
                className="hover:bg-secondary text-secondary-foreground flex w-full items-center justify-between rounded-lg px-3 py-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className="text-xs font-medium">Ücretsiz Deneme</span>
                </div>
                <ChevronDown className="text-muted-foreground h-3 w-3" />
              </button>

              <div className="hover:bg-secondary flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Avatar className="border-border h-7 w-7 border">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-brand text-[10px] font-bold text-white">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col truncate">
                    <span className="text-foreground truncate text-[11px] font-medium">
                      {session.user.email}
                    </span>
                  </div>
                </div>
                <ChevronsUpDown className="text-muted-foreground h-3 w-3 shrink-0" />
              </div>

              <div className="border-muted flex items-center justify-around border-t pt-2">
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 py-1.5 text-[10px] transition-colors"
                >
                  <HelpCircle className="h-3 w-3" />
                  <span>Yardım</span>
                </button>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 py-1.5 text-[10px] transition-colors"
                >
                  <Bell className="h-3 w-3" />
                  <span>Güncellemeler</span>
                </button>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Main Content */}
      <main className="animate-in slide-in-from-right-2 relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
