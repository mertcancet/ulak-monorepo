import {
  Edit3,
  History as HistoryIcon,
  Home,
  MoreHorizontal,
  Rocket,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import DashboardHeader from "../dashboard-header";
import { AgentMeta } from "./agent-meta";
import { AGENT_MOCK_DATA } from "./constants";

export const AgentHeader = () => {
  return (
    <DashboardHeader>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-secondary/50 rounded-lg"
        >
          <Home className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold tracking-tight">
            {AGENT_MOCK_DATA.title}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
        </div>
        <AgentMeta />
      </div>
      <div className="flex items-center space-x-3">
        <nav className="flex items-center gap-1 mr-2">
          <a
            className="px-3 py-1.5 text-sm font-medium text-foreground bg-[rgba(0,0,0,0.05)] rounded-full transition-colors"
            href="#configure"
          >
            Yapılandır
          </a>
          <a
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            href="#simulation"
          >
            Simülasyon
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <HistoryIcon className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Rocket className="h-3.5 w-3.5" />
            <span>Yayınla</span>
          </Button>
        </div>
      </div>
    </DashboardHeader>
  );
};
